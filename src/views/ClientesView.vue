<template>
  <div class="clientes-view">
    <h2 class="mb-4">👥 Gestión de Clientes</h2>

    <!-- Verificar si el usuario es cliente -->
    <div v-if="!esCliente" class="alert alert-info">
      <h5>ℹ️ No estás registrado como cliente</h5>
      <p>Completa el formulario para registrarte en nuestra librería</p>
    </div>

    <div v-else class="alert alert-success">
      <h5>✅ ¡Ya eres cliente!</h5>
      <p>Bienvenido de nuevo, {{ clienteActual.nombre }}</p>
    </div>

    <!-- Formulario de registro -->
    <div class="card mb-4" v-if="!esCliente">
      <div class="card-header bg-primary-custom text-white">
        <h5>📝 Registro de Cliente</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="registrarCliente">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nombre completo *</label>
              <input
                type="text"
                class="form-control"
                v-model="formulario.nombre"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Email *</label>
              <input
                type="email"
                class="form-control"
                v-model="formulario.email"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Teléfono *</label>
              <input
                type="tel"
                class="form-control"
                v-model="formulario.telefono"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Dirección</label>
              <input
                type="text"
                class="form-control"
                v-model="formulario.direccion"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Registrarme como Cliente
          </button>
        </form>
      </div>
    </div>

    <!-- Tabla de clientes registrados -->
    <div class="card">
      <div class="card-header bg-secondary-custom text-white">
        <h5>📋 Clientes Registrados ({{ clientes.length }})</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion || 'N/A' }}</td>
                <td>{{ cliente.fechaRegistro }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientesView',
  data() {
    return {
      esCliente: false,
      clienteActual: null,
      clientes: [],
      formulario: {
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
      }
    }
  },
  mounted() {
    this.cargarClientes()
    this.verificarCliente()
  },
  methods: {
    cargarClientes() {
      const clientesGuardados = localStorage.getItem('clientes')
      if (clientesGuardados) {
        this.clientes = JSON.parse(clientesGuardados)
      } else {
        // Clientes de ejemplo
        this.clientes = [
          {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan@email.com',
            telefono: '555-0001',
            direccion: 'Calle Principal 123',
            fechaRegistro: '2024-01-15'
          },
          {
            id: 2,
            nombre: 'María García',
            email: 'maria@email.com',
            telefono: '555-0002',
            direccion: 'Av. Libertad 456',
            fechaRegistro: '2024-02-20'
          }
        ]
        localStorage.setItem('clientes', JSON.stringify(this.clientes))
      }
    },
    verificarCliente() {
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      this.clienteActual = this.clientes.find(c => c.email === usuario.username + '@libreria.com')
      this.esCliente = !!this.clienteActual
    },
    registrarCliente() {
      const nuevoCliente = {
        id: this.clientes.length + 1,
        ...this.formulario,
        fechaRegistro: new Date().toLocaleDateString('es-ES')
      }
      
      this.clientes.push(nuevoCliente)
      localStorage.setItem('clientes', JSON.stringify(this.clientes))
      
      this.clienteActual = nuevoCliente
      this.esCliente = true
      
      alert('✅ ¡Registro exitoso! Ahora eres cliente de nuestra librería')
      
      // Limpiar formulario
      this.formulario = {
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
      }
    }
  }
}
</script>

<style scoped>
.clientes-view {
  padding: 20px;
}

.table {
  background: white;
}

.table thead {
  background-color: var(--color-light);
  color: var(--color-primary);
}
</style>