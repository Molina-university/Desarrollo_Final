<template>
  <div class="product-view">
    <!-- Breadcrumbs -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/dashboard"><i class="bi bi-house-door-fill"></i> Inicio</router-link></li>
        <li class="breadcrumb-item active"><i class="bi bi-box-seam-fill"></i> Libros</li>
      </ol>
    </nav>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="bi bi-box-seam-fill"></i> Gestión de Libros ({{ productos.length }})</h2>
      <button class="btn btn-primary" @click="mostrarModalCrear">
        <i class="bi bi-plus-circle me-2"></i>Agregar Libro
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando libros...</p>
    </div>

    <!-- Lista de productos con paginación -->
    <div v-else>
      <div class="row g-4 mb-4">
        <div
          v-for="producto in productosPaginados"
          :key="producto.id"
          class="col-12 col-md-6 col-lg-4 col-xl-3"
        >
          <ProductCardComponent
            :producto="producto"
            @ver-detalle="verDetalle"
            @editar="editarProducto"
            @eliminar="confirmarEliminar"
          />
        </div>
      </div>

      <!-- Paginación -->
      <nav v-if="totalPaginas > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: paginaActual === 1 }">
            <a class="page-link" @click="cambiarPagina(paginaActual - 1)">Anterior</a>
          </li>
          <li
            v-for="pagina in totalPaginas"
            :key="pagina"
            class="page-item"
            :class="{ active: pagina === paginaActual }"
          >
            <a class="page-link" @click="cambiarPagina(pagina)">{{ pagina }}</a>
          </li>
          <li class="page-item" :class="{ disabled: paginaActual === totalPaginas }">
            <a class="page-link" @click="cambiarPagina(paginaActual + 1)">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Toast de notificaciones -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        ref="toastElement"
        class="toast align-items-center text-white border-0"
        :class="toastClass"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>
    </div>

    <!-- Modal para ver detalles -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" ref="modalDetalle">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles del Libro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="productoSeleccionado">
            <div class="row">
              <div class="col-md-4">
                <img
                  :src="productoSeleccionado.image"
                  class="img-fluid rounded"
                  :alt="productoSeleccionado.title"
                />
              </div>
              <div class="col-md-8">
                <h4>{{ productoSeleccionado.title }}</h4>
                <p class="text-muted mb-1">
                  <strong>Autor:</strong> {{ productoSeleccionado.author || 'Desconocido' }}
                </p>
                <p class="text-muted mb-1">
                  <strong>Editorial:</strong> {{ productoSeleccionado.publisher || 'Desconocida' }}
                </p>
                <p class="text-muted mb-3">
                  <span class="badge bg-secondary">{{ productoSeleccionado.category }}</span>
                </p>
                <p>{{ productoSeleccionado.description }}</p>
                <h3 class="text-primary">${{ productoSeleccionado.price }}</h3>
                <p v-if="productoSeleccionado.isbn">
                  <strong>ISBN:</strong> {{ productoSeleccionado.isbn }}
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear/editar -->
    <div class="modal fade" id="modalForm" tabindex="-1" ref="modalForm">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modoEdicion ? 'Editar Libro' : 'Agregar Libro' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarProducto">
              <div class="row">
                <div class="col-md-8 mb-3">
                  <label class="form-label">Título *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formulario.title"
                    required
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Precio ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    class="form-control"
                    v-model="formulario.price"
                    required
                  />
                </div>
              </div>
              
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Autor *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formulario.author"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Editorial *</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formulario.publisher"
                    required
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Categoría *</label>
                  <select class="form-select" v-model="formulario.category" required>
                    <option value="">Seleccionar...</option>
                    <option value="Ficción">Ficción</option>
                    <option value="No Ficción">No Ficción</option>
                    <option value="Historia">Historia</option>
                    <option value="Ciencia">Ciencia</option>
                    <option value="Arte">Arte</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Filosofía">Filosofía</option>
                    <option value="Poesía">Poesía</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">ISBN (opcional)</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formulario.isbn"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Descripción *</label>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="formulario.description"
                  required
                ></textarea>
              </div>
              
              <div class="mb-3">
                <label class="form-label">URL de la imagen *</label>
                <input
                  type="url"
                  class="form-control"
                  v-model="formulario.image"
                  required
                />
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                  <i :class="modoEdicion ? 'bi bi-check-circle me-1' : 'bi bi-plus-circle me-1'"></i>
                  {{ modoEdicion ? 'Actualizar' : 'Crear' }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div class="modal fade" id="modalConfirmar" tabindex="-1" ref="modalConfirmar">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title"><i class="bi bi-exclamation-triangle-fill me-2"></i>Confirmar Eliminación</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="productoAEliminar">
            <p>¿Estás seguro de que deseas eliminar este libro?</p>
            <div class="alert alert-warning">
              <strong>{{ productoAEliminar.title }}</strong><br>
              <small>Autor: {{ productoAEliminar.author }}</small>
            </div>
            <p class="text-muted small">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" class="btn btn-danger" @click="eliminarProducto">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import productService from '@/services/productService'
import { Modal, Toast } from 'bootstrap'

export default {
  name: 'ProductView',
  components: {
    ProductCardComponent
  },
  data() {
    return {
      productos: [],
      loading: true,
      productoSeleccionado: null,
      productoAEliminar: null,
      modoEdicion: false,
      formulario: {
        title: '',
        price: '',
        author: '',
        publisher: '',
        category: '',
        isbn: '',
        description: '',
        image: ''
      },
      // Paginación
      paginaActual: 1,
      itemsPorPagina: 8,
      // Toast
      toastMessage: '',
      toastClass: 'bg-success'
    }
  },
  computed: {
    productosPaginados() {
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina
      const fin = inicio + this.itemsPorPagina
      return this.productos.slice(inicio, fin)
    },
    totalPaginas() {
      return Math.ceil(this.productos.length / this.itemsPorPagina)
    }
  },
  async mounted() {
    await this.cargarProductos()
  },
  methods: {
    async cargarProductos() {
      this.loading = true
      try {
        this.productos = await productService.getAllProducts()
      } catch (error) {
        this.mostrarToast('Error al cargar los libros', 'bg-danger')
      } finally {
        this.loading = false
      }
    },
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    verDetalle(producto) {
      this.productoSeleccionado = producto
      const modal = new Modal(this.$refs.modalDetalle)
      modal.show()
    },
    mostrarModalCrear() {
      this.modoEdicion = false
      this.formulario = {
        title: '',
        price: '',
        author: '',
        publisher: '',
        category: '',
        isbn: '',
        description: '',
        image: ''
      }
      const modal = new Modal(this.$refs.modalForm)
      modal.show()
    },
    editarProducto(producto) {
      this.modoEdicion = true
      this.formulario = { ...producto }
      const modal = new Modal(this.$refs.modalForm)
      modal.show()
    },
    confirmarEliminar(id) {
      this.productoAEliminar = this.productos.find(p => p.id === id)
      const modal = new Modal(this.$refs.modalConfirmar)
      modal.show()
    },
    async guardarProducto() {
      try {
        if (this.modoEdicion) {
          await productService.updateProduct(this.formulario.id, this.formulario)
          this.mostrarToast('✅ Libro actualizado correctamente', 'bg-success')
        } else {
          await productService.createProduct(this.formulario)
          this.mostrarToast('✅ Libro creado correctamente', 'bg-success')
        }
        await this.cargarProductos()
        const modal = Modal.getInstance(this.$refs.modalForm)
        modal.hide()
      } catch (error) {
        this.mostrarToast('❌ Error al guardar el libro', 'bg-danger')
      }
    },
    async eliminarProducto() {
      try {
        await productService.deleteProduct(this.productoAEliminar.id)
        this.mostrarToast('✅ Libro eliminado correctamente', 'bg-success')
        await this.cargarProductos()
        const modal = Modal.getInstance(this.$refs.modalConfirmar)
        modal.hide()
      } catch (error) {
        this.mostrarToast('❌ Error al eliminar el libro', 'bg-danger')
      }
    },
    mostrarToast(mensaje, clase) {
      this.toastMessage = mensaje
      this.toastClass = clase
      const toast = new Toast(this.$refs.toastElement)
      toast.show()
    }
  }
}
</script>

<style scoped>
.product-view {
  padding: 20px;
}

.breadcrumb {
  background-color: transparent;
  padding: 0;
  margin-bottom: 1rem;
}

.pagination .page-link {
  cursor: pointer;
  color: var(--color-primary);
}

.pagination .page-item.active .page-link {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>