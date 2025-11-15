<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="bi bi-book"></i> 📚 Librería Online
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <span class="nav-link text-white">
              👤 {{ usuarioNombre }}
            </span>
          </li>
          <li class="nav-item">
            <button class="btn btn-outline-light btn-sm" @click="cerrarSesion">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  props: {
    usuarioNombre: {
      type: String,
      default: 'Usuario'
    }
  },
  methods: {
    cerrarSesion() {
      // Limpiar el usuario guardado
      localStorage.removeItem('usuario')
      // Redirigir al login
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>