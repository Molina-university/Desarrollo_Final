<template>
  <div class="sidebar" :class="{ 'sidebar-collapsed': !isOpen }">
    <button class="sidebar-toggle" @click="toggleSidebar">
      <i :class="isOpen ? 'bi bi-chevron-left' : 'bi bi-chevron-right'"></i>
    </button>
    
    <div class="sidebar-header">
      <i class="bi bi-grid-fill"></i>
      <span v-if="isOpen">Menú</span>
    </div>
    
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" active-class="active" exact>
          <i class="bi bi-house-door-fill"></i>
          <span v-if="isOpen">Dashboard</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link" active-class="active">
          <i class="bi bi-box-seam-fill"></i>
          <span v-if="isOpen">Productos</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/clientes" class="nav-link" active-class="active">
          <i class="bi bi-people-fill"></i>
          <span v-if="isOpen">Clientes</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/valoraciones" class="nav-link" active-class="active">
          <i class="bi bi-star-fill"></i>
          <span v-if="isOpen">Valoraciones</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      isOpen: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
      this.$emit('sidebar-toggle', this.isOpen)
    }
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 56px;
  z-index: 100;
  background: linear-gradient(180deg, var(--color-dark) 0%, #0f172a 100%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-lg);
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-toggle {
  position: absolute;
  right: -15px;
  top: 70px;
  background: var(--color-primary);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.sidebar-toggle:hover {
  background: var(--color-primary-light);
  transform: scale(1.1);
}

.sidebar-header {
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-header i {
  font-size: 1.25rem;
}

.sidebar-collapsed .sidebar-header {
  justify-content: center;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  padding: 0.875rem 1.25rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 500;
  border-left: 3px solid transparent;
}

.sidebar-collapsed .nav-link {
  justify-content: center;
  padding: 0.875rem;
}

.nav-link i {
  font-size: 1.25rem;
  min-width: 1.25rem;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: var(--color-primary);
}

.nav-link.active {
  background: linear-gradient(90deg, var(--color-primary) 0%, transparent 100%);
  color: white;
  border-left-color: var(--color-accent);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-250px);
  }
  
  .sidebar.sidebar-collapsed {
    transform: translateX(-70px);
  }
  
  .sidebar:not(.sidebar-collapsed) {
    transform: translateX(0);
  }
}
</style>