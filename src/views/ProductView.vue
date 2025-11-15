<template>
  <div class="product-view">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>📚 Gestión de Libros</h2>
      <button class="btn btn-primary" @click="mostrarModalCrear">
        ➕ Agregar Libro
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando libros...</p>
    </div>

    <!-- Lista de productos -->
    <div v-else class="row g-4">
      <div
        v-for="producto in productos"
        :key="producto.id"
        class="col-12 col-md-6 col-lg-4 col-xl-3"
      >
        <ProductCardComponent
          :producto="producto"
          @ver-detalle="verDetalle"
          @editar="editarProducto"
          @eliminar="eliminarProducto"
        />
      </div>
    </div>

    <!-- Modal para ver detalles -->
    <div
      class="modal fade"
      id="modalDetalle"
      tabindex="-1"
      ref="modalDetalle"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles del Libro</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body" v-if="productoSeleccionado">
            <div class="row">
              <div class="col-md-4">
                <img
                  :src="productoSeleccionado.image"
                  class="img-fluid"
                  :alt="productoSeleccionado.title"
                />
              </div>
              <div class="col-md-8">
                <h4>{{ productoSeleccionado.title }}</h4>
                <p class="text-muted">{{ productoSeleccionado.category }}</p>
                <p>{{ productoSeleccionado.description }}</p>
                <h3 class="text-primary">${{ productoSeleccionado.price }}</h3>
                <p>
                  ⭐ {{ productoSeleccionado.rating?.rate || 'N/A' }} ({{
                    productoSeleccionado.rating?.count || 0
                  }}
                  valoraciones)
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modoEdicion ? 'Editar Libro' : 'Agregar Libro' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarProducto">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formulario.title"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Precio</label>
                <input
                  type="number"
                  step="0.01"
                  class="form-control"
                  v-model="formulario.price"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Categoría</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formulario.category"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="formulario.description"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">URL de la imagen</label>
                <input
                  type="url"
                  class="form-control"
                  v-model="formulario.image"
                  required
                />
              </div>
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
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
  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import productService from '@/services/productService'
import { Modal } from 'bootstrap'

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
      modoEdicion: false,
      formulario: {
        title: '',
        price: '',
        category: '',
        description: '',
        image: ''
      }
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
        alert('Error al cargar los libros')
      } finally {
        this.loading = false
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
        category: '',
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
    async guardarProducto() {
      try {
        if (this.modoEdicion) {
          await productService.updateProduct(this.formulario.id, this.formulario)
          alert('✅ Libro actualizado correctamente')
        } else {
          await productService.createProduct(this.formulario)
          alert('✅ Libro creado correctamente')
        }
        await this.cargarProductos()
        const modal = Modal.getInstance(this.$refs.modalForm)
        modal.hide()
      } catch (error) {
        alert('❌ Error al guardar el libro')
      }
    },
    async eliminarProducto(id) {
      if (confirm('¿Estás seguro de eliminar este libro?')) {
        try {
          await productService.deleteProduct(id)
          alert('✅ Libro eliminado correctamente')
          await this.cargarProductos()
        } catch (error) {
          alert('❌ Error al eliminar el libro')
        }
      }
    }
  }
}
</script>

<style scoped>
.product-view {
  padding: 20px;
}
</style>