<template>
  <nav class="col-md-3 col-lg-2 d-md-block futuristic-sidebar p-0">
    <div class="sidebar-sticky">
      <div class="sidebar-header p-4 text-center">
        <div class="sidebar-logo mb-3">
          <span class="logo-icon">⚡</span>
        </div>
        <h6 class="text-uppercase fw-bold text-cyan mb-0">Panel Admin</h6>
        <small class="text-muted">DigiStore 2.0</small>
      </div>

      <ul class="nav flex-column px-3">
        <li class="nav-item mb-2">
          <a class="nav-link active" href="#">
            <span class="nav-icon">📊</span>
            <span class="nav-text">Dashboard</span>
            <span class="nav-indicator"></span>
          </a>
        </li>
        <li class="nav-item mb-2">
          <router-link class="nav-link" to="/productos">
            <span class="nav-icon">🚀</span>
            <span class="nav-text">Productos</span>
            <span class="nav-indicator"></span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link" href="#">
            <span class="nav-icon">📁</span>
            <span class="nav-text">Categorías</span>
            <span class="nav-indicator"></span>
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link" href="#">
            <span class="nav-icon">💰</span>
            <span class="nav-text">Ventas</span>
            <span class="nav-indicator"></span>
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link" href="#">
            <span class="nav-icon">📈</span>
            <span class="nav-text">Reportes</span>
            <span class="nav-indicator"></span>
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link" href="#">
            <span class="nav-icon">👥</span>
            <span class="nav-text">Clientes</span>
            <span class="nav-indicator"></span>
          </a>
        </li>
        <li class="nav-item mb-2">
          <a class="nav-link" href="#">
            <span class="nav-icon">⚙️</span>
            <span class="nav-text">Configuración</span>
            <span class="nav-indicator"></span>
          </a>
        </li>
      </ul>

      <div class="sidebar-footer p-3 mt-4">
        <div class="card bg-dark border-cyan">
          <div class="card-body p-3 text-center">
            <div class="mb-2 fs-3">🎯</div>
            <p class="small mb-2 fw-bold text-cyan">Pro Version</p>
            <p class="small text-muted mb-3">Desbloquea todas las funciones</p>
            <button class="btn btn-sm btn-cyan w-100">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SidebarComponent"
};
</script>

<style scoped>
.futuristic-sidebar {
  background: linear-gradient(180deg, #0f1325 0%, #1a1f3a 100%);
  border-right: 2px solid rgba(0, 242, 255, 0.3);
  min-height: calc(100vh - 56px);
  position: sticky;
  top: 56px;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 242, 255, 0.1);
}

.sidebar-sticky {
  position: relative;
  padding-top: 1rem;
}

/* Sidebar Header */
.sidebar-header {
  border-bottom: 1px solid rgba(0, 242, 255, 0.2);
}

.sidebar-logo {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  background: rgba(0, 242, 255, 0.1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(0, 242, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.2);
}

.logo-icon {
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

.text-cyan {
  color: #00f2ff !important;
}

/* Navigation Links */
.nav-link {
  color: #8892b0;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  font-weight: 500;
  margin-bottom: 0.5rem;
  border: 1px solid transparent;
}

.nav-icon {
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

.nav-text {
  flex-grow: 1;
}

.nav-indicator {
  width: 0;
  height: 20px;
  background: linear-gradient(90deg, #00f2ff, #ff00ff);
  border-radius: 3px;
  transition: width 0.3s ease;
  position: absolute;
  right: 10px;
}

.nav-link:hover,
.nav-link.active,
.nav-link.router-link-active {
  color: #fff;
  background: rgba(0, 242, 255, 0.1);
  border-color: rgba(0, 242, 255, 0.3);
  transform: translateX(5px);
}

.nav-link:hover .nav-icon,
.nav-link.active .nav-icon,
.nav-link.router-link-active .nav-icon {
  transform: scale(1.2);
  filter: drop-shadow(0 0 10px #00f2ff);
}

.nav-link.active,
.nav-link.router-link-active {
  background: linear-gradient(90deg, rgba(0, 242, 255, 0.15), rgba(255, 0, 255, 0.05));
  border-color: #00f2ff;
  box-shadow: 0 4px 15px rgba(0, 242, 255, 0.2);
}

.nav-link.active .nav-indicator,
.nav-link.router-link-active .nav-indicator {
  width: 4px;
}

.nav-link:hover .nav-indicator {
  width: 4px;
  opacity: 0.5;
}

/* Sidebar Footer */
.sidebar-footer {
  border-top: 1px solid rgba(0, 242, 255, 0.2);
}

.border-cyan {
  border-color: rgba(0, 242, 255, 0.3) !important;
}

.bg-dark {
  background: rgba(10, 14, 39, 0.6) !important;
  backdrop-filter: blur(10px);
}

.btn-cyan {
  background: linear-gradient(45deg, #00f2ff, #00c8d4);
  color: #0a0e27;
  border: none;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.btn-cyan:hover {
  background: linear-gradient(45deg, #00c8d4, #00f2ff);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 242, 255, 0.4);
  color: #0a0e27;
}

/* Scrollbar */
.futuristic-sidebar::-webkit-scrollbar {
  width: 6px;
}

.futuristic-sidebar::-webkit-scrollbar-track {
  background: rgba(10, 14, 39, 0.5);
}

.futuristic-sidebar::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #00f2ff, #ff00ff);
  border-radius: 3px;
}

.futuristic-sidebar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #ff00ff, #00f2ff);
}

/* Responsive */
@media (max-width: 768px) {
  .futuristic-sidebar {
    position: relative;
    top: 0;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid rgba(0, 242, 255, 0.3);
  }
  
  .sidebar-sticky {
    padding-top: 0;
  }
}
</style>