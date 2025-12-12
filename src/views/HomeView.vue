<template>
  <div class="home-view">
    <!-- Breadcrumbs -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active"><i class="bi bi-house-door-fill"></i> Inicio</li>
      </ol>
    </nav>

    <h1 class="mb-4"><i class="bi bi-book-fill"></i> Bienvenido a la Librería Online</h1>
    
    <!-- Tarjetas de estadísticas -->
    <div class="row g-4 mb-5">
      <div class="col-md-3">
        <div class="stat-card bg-primary-custom text-white">
          <div class="stat-icon"><i class="bi bi-box-seam-fill"></i></div>
          <div class="stat-info">
            <h3>{{ totalLibros }}</h3>
            <p>Total de Libros</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <div class="stat-card bg-secondary-custom text-white">
          <div class="stat-icon"><i class="bi bi-tags-fill"></i></div>
          <div class="stat-info">
            <h3>{{ totalCategorias }}</h3>
            <p>Categorías</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <div class="stat-card bg-accent-custom text-white">
          <div class="stat-icon"><i class="bi bi-people-fill"></i></div>
          <div class="stat-info">
            <h3>{{ totalClientes }}</h3>
            <p>Clientes</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <div class="stat-card bg-dark-custom text-white">
          <div class="stat-icon"><i class="bi bi-star-fill"></i></div>
          <div class="stat-info">
            <h3>{{ promedioValoraciones }}</h3>
            <p>Valoración</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Libros agregados recientemente -->
    <div class="recent-books mb-5" v-if="librosRecientes.length > 0">
      <h3 class="mb-3"><i class="bi bi-clock-history"></i> Últimos Libros Agregados</h3>
      <div class="row g-3">
        <div v-for="libro in librosRecientes" :key="libro.id" class="col-md-4">
          <div class="recent-book-card">
            <img :src="libro.image" :alt="libro.title" />
            <div class="recent-book-info">
              <h5>{{ libro.title }}</h5>
              <p class="text-muted mb-1"><small>{{ libro.author }}</small></p>
              <span class="badge bg-primary">${{ libro.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de accesos rápidos -->
    <div class="quick-actions mb-5">
      <h3 class="mb-3"><i class="bi bi-lightning-fill"></i> Accesos Rápidos</h3>
      <div class="row g-3">
        <div class="col-md-4">
          <router-link to="/dashboard/productos" class="action-card">
            <div class="action-icon"><i class="bi bi-box-seam-fill"></i></div>
            <h5>Gestionar Libros</h5>
            <p>Ver, agregar, editar y eliminar libros del catálogo</p>
          </router-link>
        </div>
        
        <div class="col-md-4">
          <router-link to="/dashboard/clientes" class="action-card">
            <div class="action-icon"><i class="bi bi-people-fill"></i></div>
            <h5>Gestionar Clientes</h5>
            <p>Administrar la base de datos de clientes</p>
          </router-link>
        </div>
        
        <div class="col-md-4">
          <router-link to="/dashboard/valoraciones" class="action-card">
            <div class="action-icon"><i class="bi bi-star-fill"></i></div>
            <h5>Valoraciones</h5>
            <p>Califica y ve opiniones de nuestros clientes</p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Información del usuario -->
    <div class="user-info-card">
      <h4><i class="bi bi-person-circle"></i> Información de la sesión</h4>
      <p><strong>Usuario:</strong> {{ usuario.nombre }}</p>
      <p><strong>Username:</strong> {{ usuario.username }}</p>
      <p><strong>Último acceso:</strong> {{ fechaActual }}</p>
    </div>
  </div>
</template>

<script>
import productService from '@/services/productService'

export default {
  name: 'HomeView',
  data() {
    return {
      totalLibros: 0,
      totalCategorias: 0,
      totalClientes: 0,
      promedioValoraciones: '4.8',
      librosRecientes: [],
      usuario: {
        nombre: '',
        username: ''
      },
      fechaActual: ''
    }
  },
  async mounted() {
    // Cargar información del usuario
    const usuarioData = localStorage.getItem('usuario')
    if (usuarioData) {
      this.usuario = JSON.parse(usuarioData)
    }

    // Obtener fecha actual
    const fecha = new Date()
    this.fechaActual = fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Cargar estadísticas
    await this.cargarEstadisticas()
  },
  methods: {
    async cargarEstadisticas() {
      try {
        // Cargar libros
        const productos = await productService.getAllProducts()
        this.totalLibros = productos.length
        
        // Obtener últimos 3 libros
        this.librosRecientes = productos.slice(-3).reverse()
        
        // Contar categorías únicas
        const categorias = new Set(productos.map(p => p.category))
        this.totalCategorias = categorias.size
        
        // Cargar clientes
        const clientes = localStorage.getItem('clientes')
        if (clientes) {
          this.totalClientes = JSON.parse(clientes).length
        }
        
        // Cargar valoraciones
        const valoraciones = localStorage.getItem('valoraciones')
        if (valoraciones) {
          const vals = JSON.parse(valoraciones)
          if (vals.length > 0) {
            const suma = vals.reduce((acc, val) => acc + val.rating, 0)
            this.promedioValoraciones = (suma / vals.length).toFixed(1)
          }
        }
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
      }
    } 
  }
}
</script>

<style scoped src="@/assets/styles/Home.css"></style>