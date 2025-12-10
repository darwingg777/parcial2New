<template>
  <nav class="navbar navbar-expand-lg navbar-dark futuristic-navbar sticky-top">
    <div class="container-fluid px-4">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <span class="brand-icon me-2">⚡</span>
        <span class="brand-text">DigiStore</span>
      </a>
      
      <button 
        class="navbar-toggler border-0" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item">
            <router-link class="nav-link px-3" to="/dashboard">
              <i class="me-2">🏠</i>
              Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-3" to="/products">
              <i class="me-2">🚀</i>
              Productos
            </router-link>
          </li>
             
          <li class="nav-item ms-lg-2">
            <a 
              class="nav-link btn btn-outline-cyan px-4" 
              href="#" 
              @click.prevent="mostrarModalLogout"
              data-bs-toggle="modal" 
              data-bs-target="#logoutModal"
            >
              <i class="me-2">🔒</i>
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Modal de confirmación de Bootstrap -->
  <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content futuristic-modal">
        <div class="modal-header border-0">
          <h5 class="modal-title" id="logoutModalLabel">
            <i class="me-2">🔒</i>
            Cerrar Sesión
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">¿Estás seguro de que deseas cerrar sesión?</p>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-cyan" @click="cerrarSesion">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import apiService from "@/services/apiService";

export default {
  name: "HeaderComponent",
  setup() {
    const router = useRouter();

    const cerrarSesion = () => {
      
        // Llama al logout de tu apiService
        const result = apiService.login.logout();
        console.log("Logout:", result.message); // "Sesión cerrada"
        
        // Redirige
        router.push("/");
        
        // Opcional: Recargar para limpiar estado
        setTimeout(() => {
          window.location.reload();
        }, 100);
      
    };

    return {
      cerrarSesion
    };
  },
};
</script>
<style scoped>
.futuristic-navbar {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(0, 242, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 242, 255, 0.2);
  z-index: 1000;
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: 900;
  transition: all 0.3s ease;
}

.brand-icon {
  font-size: 2rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 5px #00f2ff);
  }
  50% {
    transform: scale(1.1);
    filter: drop-shadow(0 0 15px #00f2ff);
  }
}

.brand-text {
  background: linear-gradient(45deg, #00f2ff, #ff00ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav-link {
  color: #fff !important;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f2ff, #ff00ff);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 80%;
}

.nav-link:hover {
  color: #00f2ff !important;
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  color: #00f2ff !important;
}

.btn-outline-cyan {
  border: 2px solid #00f2ff;
  color: #00f2ff !important;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-outline-cyan::after {
  display: none;
}

.btn-outline-cyan:hover {
  background: #00f2ff;
  color: #0a0e27 !important;
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.6);
  transform: translateY(-2px);
  border-color: #00f2ff;
}

.navbar-toggler {
  border-color: #00f2ff !important;
  box-shadow: 0 0 10px rgba(0, 242, 255, 0.3);
}

.navbar-toggler:focus {
  box-shadow: 0 0 15px rgba(0, 242, 255, 0.5);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 242, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Responsive */
@media (max-width: 991px) {
  .nav-item {
    text-align: center;
    padding: 0.5rem 0;
  }
  
  .btn-outline-cyan {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>