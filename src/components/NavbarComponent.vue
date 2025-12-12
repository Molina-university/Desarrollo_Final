<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center gap-2" href="#">
        <i class="bi bi-book-fill"></i>
        <span>Librería Online</span>
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
        <ul class="navbar-nav ms-auto align-items-center gap-2">
          <li class="nav-item">
            <button
              class="btn btn-sm btn-outline-light"
              @click="toggleDarkMode"
              :title="darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              <i :class="darkMode ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
            </button>
          </li>
          
          <li class="nav-item">
            <div class="user-info">
              <i class="bi bi-person-circle"></i>
              <span>{{ usuarioNombre }}</span>
            </div>
          </li>
          
          <li class="nav-item">
            <button class="btn btn-sm btn-outline-light" @click="cerrarSesion">
              <i class="bi bi-box-arrow-right me-1"></i>
              Salir
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
  data() {
    return {
      darkMode: false
    }
  },
  mounted() {
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode === 'true') {
      this.darkMode = true
      document.body.classList.add('dark-mode')
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      
      if (this.darkMode) {
        document.body.classList.add('dark-mode')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.body.classList.remove('dark-mode')
        localStorage.setItem('darkMode', 'false')
      }
    },
    cerrarSesion() {
      localStorage.removeItem('usuario')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  box-shadow: var(--shadow-md);
  padding: 0.75rem 0;
}

.navbar-brand {
  font-weight: 700;
  font-size: 1.375rem;
  transition: var(--transition);
}

.navbar-brand:hover {
  transform: scale(1.02);
}

.navbar-brand i {
  font-size: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  font-weight: 500;
}

.user-info i {
  font-size: 1.25rem;
}

.btn-outline-light {
  border-width: 2px;
  font-weight: 500;
  transition: var(--transition);
}

.btn-outline-light:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 991px) {
  .navbar-nav {
    padding-top: 1rem;
    gap: 0.75rem !important;
  }
  
  .nav-item {
    width: 100%;
  }
  
  .btn, .user-info {
    width: 100%;
    justify-content: center;
  }
  
  .navbar-collapse {
    background: rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: var(--radius-md);
    margin-top: 0.5rem;
  }
}
</style>