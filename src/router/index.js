import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import ClientesView from '@/views/ClientesView.vue'
import ValoracionesView from '@/views/ValoracionesView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
      },
      {
        path: 'productos',
        name: 'Productos',
        component: ProductView
      },
      {
        path: 'clientes',
        name: 'Clientes',
        component: ClientesView
      },
      {
        path: 'valoraciones',
        name: 'Valoraciones',
        component: ValoracionesView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Guard de navegación
router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem('usuario')
  
  if (to.path === '/login' && usuario) {
    next('/dashboard')
  } else if (to.path !== '/login' && !usuario) {
    next('/login')
  } else {
    next()
  }
})

export default router