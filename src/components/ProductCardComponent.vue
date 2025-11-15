<template>
  <div class="card h-100 shadow-sm product-card">
    <img :src="producto.image" class="card-img-top" :alt="producto.title" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ producto.title }}</h5>
      <p class="card-text text-muted small">{{ producto.category }}</p>
      <p class="card-text flex-grow-1">
        {{ producto.description.substring(0, 100) }}...
      </p>
      <div class="d-flex justify-content-between align-items-center mt-auto">
        <span class="h5 text-primary mb-0">${{ producto.price }}</span>
        <div>
          <button class="btn btn-sm btn-outline-primary me-1" @click="verDetalle">
            👁️ Ver
          </button>
          <button class="btn btn-sm btn-outline-warning me-1" @click="editar">
            ✏️ Editar
          </button>
          <button class="btn btn-sm btn-outline-danger" @click="eliminar">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    producto: {
      type: Object,
      required: true
    }
  },
  methods: {
    verDetalle() {
      this.$emit('ver-detalle', this.producto)
    },
    editar() {
      this.$emit('editar', this.producto)
    },
    eliminar() {
      this.$emit('eliminar', this.producto.id)
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 200px;
  object-fit: contain;
  padding: 15px;
  background-color: #f8f9fa;
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>


