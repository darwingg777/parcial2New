import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'


const router = createRouter ({
  history: createWebHistory(),
  routes: [{
    path: '/',
   
    component: LoginView
  },
  {
    path: '/dashboard',
    
    component: import('../views/DashboardView.vue'),
   
  },
  {
    path: '/productos',
    
    component: import('../views/ProductoView.vue'),
  }]
})



  




// Guard de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const sesion = localStorage.getItem('logueado')
  
  if (to.meta.requiresAuth && !sesion) {
    // Si la ruta requiere autenticación y no hay sesión, redirigir al login
    next('/')
  } else if (to.path === '/' && sesion) {
    // Si ya está logueado y trata de ir al login, redirigir al dashboard
    next('/dashboard')
  } else {
    next()
  }
})

export default router