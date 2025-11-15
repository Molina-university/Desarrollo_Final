<template>
  <div class="login-container">
    <div class="login-card">
      <div class="text-center mb-4">
        <h1 class="display-4">📚</h1>
        <h2>Librería Online</h2>
        <p class="text-muted">Inicia sesión para continuar</p>
      </div>

      <!-- Alerta de error -->
      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>❌ Error:</strong> {{ error }}
        <button type="button" class="btn-close" @click="error = ''"></button>
      </div>

      <!-- Formulario de login -->
      <form @submit.prevent="iniciarSesion">
        <div class="mb-3">
          <label for="username" class="form-label">Usuario</label>
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="username"
            placeholder="Ingresa tu usuario"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          <span v-if="loading">Iniciando sesión...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <!-- Información de usuarios de prueba -->
      <div class="mt-4 p-3 bg-light rounded">
        <small class="text-muted">
          <strong>👤 Usuarios de prueba:</strong><br />
          • admin / admin123<br />
          • usuario / user123
        </small>
      </div>
    </div>
  </div>
</template> 

<script>
import usuarios from '@/data/usuarios.json'

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    iniciarSesion() {
      this.error = ''
      this.loading = true

      // Simular delay de autenticación
      setTimeout(() => {
        // Buscar usuario en el JSON
        const usuario = usuarios.find(
          (u) => u.username === this.username && u.password === this.password
        )

        if (usuario) {
          // Guardar usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(usuario))
          // Redirigir al dashboard
          this.$router.push('/dashboard')
        } else {
          this.error = 'Usuario o contraseña incorrectos'
        }

        this.loading = false
      }, 800)
    }
  },
  mounted() {
    // Si ya hay un usuario logueado, redirigir al dashboard
    const usuario = localStorage.getItem('usuario')
    if (usuario) {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 100%;
}

.login-card h2 {
  color: #333;
  font-weight: bold;
}
</style>