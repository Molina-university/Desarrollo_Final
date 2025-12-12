<template>
  <div class="dashboard-layout">
    <NavbarComponent :usuario-nombre="usuarioNombre" />

    <div class="main-container">
      <SidebarComponent @sidebar-toggle="handleSidebarToggle" />

      <main class="content" :class="{ 'content-expanded': !sidebarOpen }">
        <div class="container-fluid py-4">
          <router-view />
        </div>

        <FooterComponent />
      </main>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  },
  data() {
    return {
      usuarioNombre: 'Usuario',
      sidebarOpen: true
    }
  },
  methods: {
    handleSidebarToggle(isOpen) {
      this.sidebarOpen = isOpen
    }
  },
  mounted() {
    const usuario = localStorage.getItem('usuario')

    if (!usuario) {
      this.$router.push('/login')
    } else {
      const usuarioObj = JSON.parse(usuario)
      this.usuarioNombre = usuarioObj.nombre
    }

    if (window.innerWidth < 768) {
      this.sidebarOpen = false
    }
  }
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
  padding-top: 56px;
}

.content {
  flex: 1;
  margin-left: 250px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 56px);
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-expanded {
  margin-left: 70px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
  }
  
  .content-expanded {
    margin-left: 0;
  }
}
</style>