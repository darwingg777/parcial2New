<template>
  <HeaderComponent />
  <div class="content-area">
    <!-- Header Section -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">
          <i class="bi bi-rocket-takeoff title-icon"></i>
          Gestión de Productos
        </h1>
        <p class="welcome-subtitle">Administra tu catálogo de productos</p>
      </div>
      <div class="header-actions">
        <button class="btn-new-product" @click="goCreate">
          <i class="bi bi-plus-circle btn-icon"></i>
          <span class="btn-text">Nuevo Producto</span>
        </button>
      </div>
    </div>

    <!-- Alerts -->
    <transition name="fade">
      <div v-if="error" class="alert alert-error">
        <i class="bi bi-exclamation-triangle-fill alert-icon"></i>
        <span>{{ error }}</span>
        <button class="alert-close" @click="error = null">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="success" class="alert alert-success">
        <i class="bi bi-check-circle-fill alert-icon"></i>
        <span>{{ success }}</span>
        <button class="alert-close" @click="success = null">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </transition>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <i class="bi bi-box-seam-fill"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ products.length }}</div>
          <div class="stat-label">Total Productos</div>
        </div>
      </div>
    </div>

    <!-- Product Table Container -->
    <div class="table-container">
      <div class="table-header">
        <h2 class="table-title">
          <i class="bi bi-list-ul table-icon"></i>
          Lista de Productos
        </h2>
        <div class="table-actions">
          <button class="btn-refresh" @click="load" title="Actualizar">
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>

      <ProductTable
        :products="products"
        @edit="goEdit"
        @delete="handleDelete"
      />
    </div>
  </div>

  <!-- Modal de confirmación -->
  <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content futuristic-modal">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            <i class="bi bi-trash3 modal-icon"></i>
            Confirmar Eliminación
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p class="mb-0">¿Estás seguro de que deseas eliminar este producto?</p>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <i class="bi bi-x-circle me-2"></i>
            Cancelar
          </button>
          <button type="button" class="btn btn-danger-custom">
            <i class="bi bi-trash3-fill me-2"></i>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import ProductTable from '@/components/ProductTable.vue'
import apiService from '@/services/apiService.js';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: { ProductTable, HeaderComponent },
  
  setup() {
    const products = ref([])
    const error = ref(null)
    const success = ref(null)
    const router = useRouter()

    const load = async () => {
      error.value = null
      try {
        const res = await apiService.products.getAllProducts()
        products.value = res.data
      } catch (err) {
        error.value = 'Error cargando productos'
        console.error(err)
      }
    }

    const goEdit = (id) => {
      router.push({ name: 'ProductEdit', params: { id } })
    }

    const goCreate = () => {
      router.push({ name: 'ProductCreate' })
    }

    const handleDelete = async (id) => {
      error.value = null
      success.value = null
      try {
        await apiService.products.deleteProduct(id)
        success.value = 'Producto eliminado correctamente'
        await load()
        setTimeout(() => {
          success.value = null
        }, 3000)
      } catch (err) {
        error.value = 'Error eliminando producto'
        console.error(err)
      }
    }

    onMounted(load)

    return { products, error, success, goEdit, goCreate, handleDelete, load }
  }
}
</script>

<style scoped>
.content-area {
  padding: 2rem;
  background: linear-gradient(135deg, #0a0e27 0%, #0a1628 100%);
  min-height: 100vh;
  color: #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Welcome Section */
.welcome-section {
  background: linear-gradient(135deg, #1a2942, #0d1b2a);
  border: 2px solid rgba(0, 242, 255, 0.3);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8px 32px rgba(0, 242, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.welcome-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00f2ff, #ff00ff);
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.welcome-content {
  flex: 1;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #00f2ff, #ff00ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.title-icon {
  font-size: 2.5rem;
  animation: float 3s ease-in-out infinite;
  background: linear-gradient(45deg, #00f2ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.welcome-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

/* New Product Button */
.btn-new-product {
  background: linear-gradient(135deg, #00f2ff, #0dcaf0);
  color: #0a0e27;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 242, 255, 0.4);
}

.btn-new-product:hover {
  background: linear-gradient(135deg, #0dcaf0, #00f2ff);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 242, 255, 0.6);
}

.btn-icon {
  font-size: 1.5rem;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #1a2942, #0d1b2a);
  border: 1px solid rgba(0, 242, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.stat-card:hover {
  border-color: rgba(0, 242, 255, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 242, 255, 0.3);
}

.stat-icon {
  font-size: 3rem;
  color: #00f2ff;
  opacity: 0.8;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #00f2ff;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

/* Alerts */
.alert {
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.alert-error {
  background: rgba(220, 53, 69, 0.15);
  border: 2px solid rgba(220, 53, 69, 0.5);
  color: #ff6b7a;
}

.alert-success {
  background: rgba(40, 167, 69, 0.15);
  border: 2px solid rgba(40, 167, 69, 0.5);
  color: #5cd68d;
}

.alert-icon {
  font-size: 1.5rem;
}

.alert-close {
  margin-left: auto;
  background: none;
  border: none;
  color: inherit;
  font-size: 1.25rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  padding: 0.25rem;
  display: flex;
  align-items: center;
}

.alert-close:hover {
  opacity: 1;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Table Container */
.table-container {
  background: linear-gradient(135deg, #1a2942, #0d1b2a);
  border: 2px solid rgba(0, 242, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 242, 255, 0.2);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 242, 255, 0.2);
}

.table-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00f2ff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.table-icon {
  font-size: 1.75rem;
}

.table-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-refresh {
  background: rgba(0, 242, 255, 0.1);
  border: 1px solid rgba(0, 242, 255, 0.3);
  color: #00f2ff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-refresh:hover {
  background: rgba(0, 242, 255, 0.2);
  border-color: rgba(0, 242, 255, 0.5);
  transform: rotate(180deg);
}

/* Table Styles */
.table-container :deep(table) {
  width: 100%;
  color: #fff;
  border-collapse: separate;
  border-spacing: 0;
}

.table-container :deep(thead) {
  background: rgba(0, 242, 255, 0.05);
}

.table-container :deep(th) {
  color: #00f2ff;
  font-weight: 700;
  padding: 1rem;
  text-align: left;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 1px;
  border-bottom: 2px solid rgba(0, 242, 255, 0.3);
}

.table-container :deep(td) {
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 242, 255, 0.1);
}

.table-container :deep(tbody tr) {
  transition: all 0.3s ease;
}

.table-container :deep(tbody tr:hover) {
  background: rgba(0, 242, 255, 0.05);
  transform: scale(1.01);
}

/* Modal Styles */
.futuristic-modal {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
  border: 2px solid rgba(0, 242, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 242, 255, 0.3);
  color: #fff;
}

.futuristic-modal .modal-header {
  border-bottom: 1px solid rgba(0, 242, 255, 0.2);
}

.futuristic-modal .modal-title {
  color: #00f2ff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-icon {
  font-size: 1.5rem;
}

.futuristic-modal .modal-footer {
  border-top: 1px solid rgba(0, 242, 255, 0.2);
}

.btn-danger-custom {
  background: linear-gradient(135deg, #dc3545, #b02a37);
  color: white;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.btn-danger-custom:hover {
  background: linear-gradient(135deg, #b02a37, #8b2332);
  box-shadow: 0 0 20px rgba(220, 53, 69, 0.6);
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .welcome-title {
    font-size: 2rem;
    justify-content: center;
  }

  .header-actions {
    width: 100%;
  }

  .btn-new-product {
    width: 100%;
    justify-content: center;
  }

  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .btn-text {
    display: none;
  }
}
</style>