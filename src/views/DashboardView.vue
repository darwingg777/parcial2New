<template>
  <div>
    <!-- Menú horizontal -->
   <HeaderComponent />

    <!-- Contenido principal -->
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <h2>Bienvenido, {{ usuario }}</h2>
          <p class="lead">Este es tu panel de administración</p>
          <div class="alert alert-info">
            <strong>Nota:</strong> Utiliza el menú superior para navegar entre las diferentes secciones.
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'DashboardView',
  components: {
    HeaderComponent
  },
  setup() {
    const router = useRouter()
    const usuario = ref('')

    onMounted(() => {
      const sesion = localStorage.getItem('logueado')
      if (sesion) {
        const datos = JSON.parse(sesion)
        usuario.value = datos.usuario
      }
    })

    const cerrarSesion = () => {
      localStorage.removeItem('logueado')
      router.push('/')
    }

  

    return {
      usuario,
      cerrarSesion
    }
  }
}
</script>

<style scoped>
.navbar-nav .nav-link {
  margin-right: 15px;
}

.navbar-nav .nav-link:hover {
  color: #ffffff !important;
}
</style>