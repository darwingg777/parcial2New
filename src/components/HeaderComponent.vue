<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Panel Administrativo</a>
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
              <router-link class="nav-link" to="/dashboard">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/productos">Productos</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="cerrarSesion">Cerrar Sesión</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "HeaderComponent",
  setup() {
    const router = useRouter();

    const cerrarSesion = () => {
      localStorage.removeItem("sesion");
      router.push("/");
    };

    return {
      cerrarSesion
    };
  },
};
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.btn-outline-light {
  margin-left: 10px;
}
</style>