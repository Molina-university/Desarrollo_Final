<template>
  <div class="home-view">
    <h1 class="mb-4">📚 Bienvenido a la Librería Online</h1>
    
    <!-- Tarjetas de estadísticas -->
    <div class="row g-4 mb-5">
      <div class="col-md-3">
        <div class="stat-card bg-primary-custom text-white">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <h3>{{ totalLibros }}</h3>
            <p>Total de Libros</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <div class="stat-card bg-secondary-custom text-white">
          <div class="stat-icon">📖</div>
          <div class="stat-info">
            <h3>15</h3>
            <p>Categorías</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <div class="stat-card bg-accent-custom text-white">
          <div class="stat-icon">👥</div>
          <div class="stat-info">
            <h3>250</h3>
            <p>Clientes</p>
          </div>
        </div>
      </div>
      
      <div class="col-md-3">
        <div class="stat-card bg-dark-custom text-white">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <h3>4.8</h3>
            <p>Valoración</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de accesos rápidos -->
    <div class="quick-actions mb-5">
      <h3 class="mb-3">Accesos Rápidos</h3>
      <div class="row g-3">
        <div class="col-md-4">
          <router-link to="/dashboard/productos" class="action-card">
            <div class="action-icon">📚</div>
            <h5>Gestionar Libros</h5>
            <p>Ver, agregar, editar y eliminar libros del catálogo</p>
          </router-link>
        </div>
        
        <div class="col-md-4">
          <router-link to="/dashboard/clientes" class="action-card">
            <div class="action-icon">👥</div>
            <h5>Gestionar Clientes</h5>
            <p>Administrar la base de datos de clientes</p>
          </router-link>
        </div>
        
        <div class="col-md-4">
          <router-link to="/dashboard/valoraciones" class="action-card">
            <div class="action-icon">⭐</div>
            <h5>Valoraciones</h5>
            <p>Califica y ve opiniones de nuestros clientes</p>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Información del usuario -->
    <div class="user-info-card">
      <h4>👤 Información de la sesión</h4>
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

    // Cargar total de libros
    try {
      const productos = await productService.getAllProducts()
      this.totalLibros = productos.length
    } catch (error) {
      console.error('Error al cargar libros:', error)
    }
  },
  methods: {
    proximamente() {
      alert('🚧 Función próximamente disponible')
    }
  }
}
</script>

<style scoped src="@/assets/styles/Home.css"></style>