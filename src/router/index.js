import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import ProductCreateView from '../views/ProductCreateView.vue';
import ProductEditView from '../views/ProductEditView.vue';
import apiService from '@/services/apiService'; // 👈 Importa tu apiService

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
       name: 'Login',
      component: LoginView,
      meta: { public: true } // 👈 Ruta pública
      
    },
    
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true } // 👈 Protegida
    },
    {
      path: '/productos',
      name: 'product',
      component: () => import('../views/ProductListView.vue'),
      meta: { requiresAuth: true }
    },
    { 
      path: '/products/new', 
      name: 'ProductCreate', 
      component: ProductCreateView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/products/edit/:id', 
      name: 'ProductEdit', 
      component: ProductEditView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/products', 
      name: 'ProductoView', 
      component: () => import('../views/ProductoView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('@/views/ClientesView.vue'),
      meta: { requiresAuth: true }
    },
    
    
  ]
})

// ============================================
// 🛡️ GUARDIA DE NAVEGACIÓN MEJORADO
// ============================================
router.beforeEach((to, from, next) => {
  // 1. Verificar si la ruta requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // 2. Verificar si es ruta pública
  const isPublic = to.matched.some(record => record.meta.public)
  
  // 3. Verificar autenticación usando TU apiService
  const isAuthenticated = apiService.login.isAuthenticated()
  
  // 4. Lógica de redirección
  if (requiresAuth && !isAuthenticated) {
    // Guardar la ruta destino para redirigir después del login
    sessionStorage.setItem('redirectPath', to.fullPath)
    
    // Redirigir al login
    next('/login')
    
  } else if (to.path === '/login' && isAuthenticated) {
    // Si ya está autenticado y va al login, redirigir al dashboard
    next('/dashboard')
    
  } else if (isPublic && isAuthenticated && to.path !== '/login') {
    // Si está autenticado y va a una ruta pública (excepto login), permitir
    next()
    
  } else {
    // Todo está bien, continuar
    next()
  }
})

// Opcional: Guardia después de navegación
router.afterEach((to, from) => {
  // Puedes usar esto para tracking, analytics, etc.
  console.log(`Navegado de ${from.path} a ${to.path}`)
})

export default router