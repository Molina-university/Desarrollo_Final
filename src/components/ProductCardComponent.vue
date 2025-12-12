<template>
  <div class="card product-card h-100">
    <img :src="producto.image" class="card-img-top" :alt="producto.title" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ producto.title }}</h5>
      
      <div class="product-meta mb-2">
        <span class="badge bg-primary">{{ producto.category }}</span>
        <p class="text-muted small mb-0 mt-1">
          <i class="bi bi-person"></i>
          {{ producto.author || 'Autor desconocido' }}
        </p>
        <p class="text-muted small" v-if="producto.publisher">
          <i class="bi bi-building"></i>
          {{ producto.publisher }}
        </p>
      </div>
      
      <p class="card-text flex-grow-1">
        {{ producto.description?.substring(0, 100) || 'Sin descripción' }}...
      </p>
      
      <div class="product-footer">
        <span class="price">${{ producto.price }}</span>
        <div class="actions">
          <button class="btn btn-sm btn-outline-primary" @click="verDetalle" title="Ver detalles">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-warning" @click="editar" title="Editar">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" @click="eliminar" title="Eliminar">
            <i class="bi bi-trash"></i>
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
  transition: var(--transition);
  border: 1px solid #e2e8f0;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.card-img-top {
  height: 280px;
  object-fit: contain;
  padding: 1.25rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
}

.card-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-dark);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  min-height: 52px;
  margin-bottom: 0.75rem;
}

.product-meta {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
}

.product-meta i {
  margin-right: 0.25rem;
  font-size: 0.875rem;
}

.card-text {
  color: var(--color-text-light);
  font-size: 0.875rem;
  line-height: 1.5;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.actions {
  display: flex;
  gap: 0.375rem;
}

.actions .btn {
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  transition: var(--transition);
}

.actions .btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.actions .btn i {
  font-size: 1rem;
}
</style>