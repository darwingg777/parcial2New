<template>
  <div class="dashboard-wrapper">
    <HeaderComponent />

    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <SidebarComponent />

        <!-- Main Content -->
        <main class="col-md-9 col-lg-10 px-md-4 main-content">
          <!-- Welcome Section -->
          <section class="row py-4">
            <div class="col-12">
              <div class="card welcome-card border-0 shadow-lg">
                <div class="card-body p-4">
                  <div class="row align-items-center">
                    <div class="col-lg-8">
                      <h1 class="display-5 fw-bold mb-3 gradient-text">
                        Bienvenido {{ usuario || 'Administrador' }} 👋
                      </h1>
                      <p class="lead text-muted mb-0">
                        Panel de control - DigiStore Management System
                      </p>
                    </div>
                    <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
                      <button class="btn btn-cyan btn-lg">
                        <i class="me-2">⚡</i>
                        Acceso Rápido
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Stats Cards -->
          <section class="row g-4 mb-4">
            <div class="col-xl-3 col-md-6">
              <div class="card stat-card border-0 shadow-lg h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="text-muted mb-2 text-uppercase small">Total Productos</p>
                      <h2 class="fw-bold mb-0 text-cyan">12</h2>
                      <small class="text-success">
                        <i>↑</i> +8% vs mes anterior
                      </small>
                    </div>
                    <div class="stat-icon bg-cyan-glow">
                      <span>📦</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6">
              <div class="card stat-card border-0 shadow-lg h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="text-muted mb-2 text-uppercase small">Ventas Totales</p>
                      <h2 class="fw-bold mb-0 text-success">$285K</h2>
                      <small class="text-success">
                        <i>↑</i> +15% este mes
                      </small>
                    </div>
                    <div class="stat-icon bg-success-glow">
                      <span>💰</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6">
              <div class="card stat-card border-0 shadow-lg h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="text-muted mb-2 text-uppercase small">Clientes</p>
                      <h2 class="fw-bold mb-0 text-purple">1,247</h2>
                      <small class="text-success">
                        <i>↑</i> +23 nuevos
                      </small>
                    </div>
                    <div class="stat-icon bg-purple-glow">
                      <span>👥</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6">
              <div class="card stat-card border-0 shadow-lg h-100">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <p class="text-muted mb-2 text-uppercase small">Pedidos Hoy</p>
                      <h2 class="fw-bold mb-0 text-warning">47</h2>
                      <small class="text-warning">
                        <i>→</i> En proceso
                      </small>
                    </div>
                    <div class="stat-icon bg-warning-glow">
                      <span>🚚</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Quick Actions & Recent Activity -->
          <section class="row g-4 mb-4">
            <div class="col-lg-6">
              <div class="card action-card border-0 shadow-lg h-100">
                <div class="card-header bg-dark-gradient border-0 py-3">
                  <h5 class="mb-0 fw-bold text-cyan">
                    <i class="me-2">⚡</i>
                    Acciones Rápidas
                  </h5>
                </div>
                <div class="card-body">
                  <div class="d-grid gap-3">
                    <button class="btn btn-outline-cyan btn-action text-start">
                      <div class="d-flex align-items-center">
                        <span class="action-icon me-3">🚀</span>
                        <div>
                          <div class="fw-bold">Agregar Producto</div>
                          <small class="text-muted">Añadir nuevo producto al catálogo</small>
                        </div>
                      </div>
                    </button>
                    <button class="btn btn-outline-cyan btn-action text-start">
                      <div class="d-flex align-items-center">
                        <span class="action-icon me-3">📊</span>
                        <div>
                          <div class="fw-bold">Ver Reportes</div>
                          <small class="text-muted">Análisis de ventas y métricas</small>
                        </div>
                      </div>
                    </button>
                    <button class="btn btn-outline-cyan btn-action text-start">
                      <div class="d-flex align-items-center">
                        <span class="action-icon me-3">⚙️</span>
                        <div>
                          <div class="fw-bold">Configuración</div>
                          <small class="text-muted">Ajustar preferencias del sistema</small>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card activity-card border-0 shadow-lg h-100">
                <div class="card-header bg-dark-gradient border-0 py-3">
                  <h5 class="mb-0 fw-bold text-cyan">
                    <i class="me-2">📝</i>
                    Actividad Reciente
                  </h5>
                </div>
                <div class="card-body">
                  <div class="activity-list">
                    <div class="activity-item">
                      <div class="activity-icon bg-success-glow">✓</div>
                      <div class="activity-content">
                        <p class="mb-1 fw-semibold">Venta completada</p>
                        <small class="text-muted">Neural Glasses VR - Hace 5 min</small>
                      </div>
                    </div>
                    <div class="activity-item">
                      <div class="activity-icon bg-cyan-glow">+</div>
                      <div class="activity-content">
                        <p class="mb-1 fw-semibold">Nuevo producto agregado</p>
                        <small class="text-muted">Quantum Watch X - Hace 1 hora</small>
                      </div>
                    </div>
                    <div class="activity-item">
                      <div class="activity-icon bg-warning-glow">⚠</div>
                      <div class="activity-content">
                        <p class="mb-1 fw-semibold">Stock bajo</p>
                        <small class="text-muted">Tesla Hoverboard Pro - Hace 2 horas</small>
                      </div>
                    </div>
                    <div class="activity-item">
                      <div class="activity-icon bg-purple-glow">👤</div>
                      <div class="activity-content">
                        <p class="mb-1 fw-semibold">Nuevo cliente registrado</p>
                        <small class="text-muted">cliente_2075@mail.com - Hace 3 horas</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'DashboardView',
  components: {
    HeaderComponent,
    SidebarComponent
  },
  setup() {
    const router = useRouter();
    const usuario = ref('');

    onMounted(() => {
      const sesion = localStorage.getItem('logueado');
      if (sesion) {
        const datos = JSON.parse(sesion);
        usuario.value = datos.usuario;
      }
    });

    const cerrarSesion = () => {
      localStorage.removeItem('logueado');
      router.push('/');
    };

    return {
      usuario,
      cerrarSesion
    };
  }
};
</script>

<style scoped>
.dashboard-wrapper {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1325 100%);
  min-height: 100vh;
}

.main-content {
  padding-top: 2rem;
}

/* Welcome Card */
.welcome-card {
  background: linear-gradient(135deg, #1a1f3a 0%, #0f1325 100%);
  border: 1px solid rgba(0, 242, 255, 0.3) !important;
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-text {
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

/* Stat Cards */
.stat-card {
  background: linear-gradient(135deg, #1a1f3a 0%, #0f1325 100%);
  border: 1px solid rgba(0, 242, 255, 0.3) !important;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 242, 255, 0.3) !important;
  border-color: #00f2ff !important;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.bg-cyan-glow {
  background: rgba(0, 242, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 242, 255, 0.3);
}

.bg-success-glow {
  background: rgba(40, 167, 69, 0.1);
  box-shadow: 0 0 20px rgba(40, 167, 69, 0.3);
}

.bg-purple-glow {
  background: rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
}

.bg-warning-glow {
  background: rgba(255, 193, 7, 0.1);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.3);
}

.text-cyan {
  color: #00f2ff !important;
}

.text-purple {
  color: #ff00ff !important;
}

/* Action & Activity Cards */
.action-card,
.activity-card {
  background: linear-gradient(135deg, #1a1f3a 0%, #0f1325 100%);
  border: 1px solid rgba(0, 242, 255, 0.3) !important;
  animation: fadeInUp 0.6s ease-out 0.5s both;
}

.bg-dark-gradient {
  background: linear-gradient(135deg, #0f1325 0%, #1a1f3a 100%) !important;
  border-bottom: 1px solid rgba(0, 242, 255, 0.3) !important;
}

.btn-action {
  padding: 1rem;
  transition: all 0.3s ease;
  border-width: 2px;
}

.btn-action:hover {
  transform: translateX(10px);
  background: rgba(0, 242, 255, 0.1);
  border-color: #00f2ff !important;
}

.action-icon {
  font-size: 2rem;
}

/* Activity List */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 242, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(0, 242, 255, 0.1);
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(0, 242, 255, 0.1);
  border-color: rgba(0, 242, 255, 0.3);
  transform: translateX(5px);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.activity-content {
  flex-grow: 1;
  color: #fff;
}

/* Buttons */
.btn-cyan {
  background: linear-gradient(45deg, #00f2ff, #00c8d4);
  color: #0a0e27;
  border: none;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-cyan:hover {
  background: linear-gradient(45deg, #00c8d4, #00f2ff);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 242, 255, 0.4);
  color: #0a0e27;
}

.btn-outline-cyan {
  border: 2px solid rgba(0, 242, 255, 0.5);
  color: #00f2ff;
}

.btn-outline-cyan:hover {
  background: rgba(0, 242, 255, 0.1);
  border-color: #00f2ff;
  color: #00f2ff;
}

/* Responsive */
@media (max-width: 768px) {
  .display-5 {
    font-size: 2rem;
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
}
</style>