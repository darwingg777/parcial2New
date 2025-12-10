<template>
  <HeaderComponent />
  
  <div class="content-area">
    <!-- Header Section -->
    <div class="welcome-section">
      <div class="welcome-content">
        <h1 class="welcome-title">
          <i class="bi bi-plus-circle-fill title-icon"></i>
          Crear Nuevo Producto
        </h1>
        <p class="welcome-subtitle">Completa el formulario para agregar un nuevo producto</p>
      </div>
      <div class="header-actions">
        <button class="btn-back" @click="showCancelModal">
          <i class="bi bi-arrow-left btn-icon"></i>
          <span class="btn-text">Volver</span>
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

    <!-- Product Form -->
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">
          <i class="bi bi-clipboard-data"></i>
          Información del Producto
        </h2>
      </div>

      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-grid">
          <!-- Nombre -->
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-tag"></i>
              Nombre del Producto
            </label>
            <input 
              v-model="formData.name"
              type="text" 
              class="form-control"
              placeholder="Ej: Laptop HP"
              required
            />
          </div>

          <!-- Precio -->
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-currency-dollar"></i>
              Precio
            </label>
            <input 
              v-model="formData.price"
              type="number" 
              step="0.01"
              class="form-control"
              placeholder="0.00"
              required
            />
          </div>

          <!-- Categoría -->
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-bookmark"></i>
              Categoría
            </label>
            <input 
              v-model="formData.category"
              type="text" 
              class="form-control"
              placeholder="Ej: Electrónica"
              required
            />
          </div>

          <!-- URL de Imagen -->
          <div class="form-group">
            <label class="form-label">
              <i class="bi bi-image"></i>
              URL de Imagen
            </label>
            <input 
              v-model="formData.image"
              type="url" 
              class="form-control"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            <small class="form-help">
              <i class="bi bi-info-circle"></i>
              Opcional: Ingresa la URL de una imagen del producto
            </small>
          </div>
        </div>

        <!-- Vista Previa de Imagen -->
        <div v-if="formData.image" class="image-preview-section">
          <label class="form-label">
            <i class="bi bi-eye"></i>
            Vista Previa
          </label>
          <div class="image-preview">
            <img 
              :src="formData.image" 
              @error="imageError = true"
              @load="imageError = false"
              v-if="!imageError"
              alt="Preview"
            />
            <div v-if="imageError" class="image-error">
              <i class="bi bi-image-fill"></i>
              <p>No se pudo cargar la imagen</p>
            </div>
          </div>
        </div>

        <!-- Descripción -->
        <div class="form-group full-width">
          <label class="form-label">
            <i class="bi bi-card-text"></i>
            Descripción (Opcional)
          </label>
          <textarea 
            v-model="formData.description"
            class="form-control"
            rows="4"
            placeholder="Describe las características del producto..."
          ></textarea>
        </div>

        <!-- Botones de Acción -->
        <div class="form-actions">
          <button 
            type="button" 
            class="btn btn-secondary"
            @click="showCancelModal"
            :disabled="saving"
          >
            <i class="bi bi-x-circle"></i>
            Cancelar
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="saving"
          >
            <span v-if="!saving">
              <i class="bi bi-check-circle"></i>
              Crear Producto
            </span>
            <span v-else>
              <i class="bi bi-hourglass-split spin"></i>
              Guardando...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal de Cancelación -->
  <div class="modal fade" id="cancelModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content futuristic-modal">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            <i class="bi bi-exclamation-triangle modal-icon"></i>
            Cancelar Creación
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p class="mb-2">¿Estás seguro de que deseas cancelar?</p>
          <p class="text-warning-custom mb-0">
            <i class="bi bi-info-circle me-2"></i>
            <small>Los cambios no guardados se perderán</small>
          </p>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <i class="bi bi-arrow-left me-2"></i>
            Continuar Editando
          </button>
          <button type="button" class="btn btn-danger-custom" @click="confirmCancel">
            <i class="bi bi-x-circle me-2"></i>
            Sí, Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Éxito -->
  <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content futuristic-modal">
        <div class="modal-header border-0">
          <h5 class="modal-title text-success">
            <i class="bi bi-check-circle-fill modal-icon"></i>
            ¡Producto Creado!
          </h5>
        </div>
        <div class="modal-body text-center">
          <div class="success-animation">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <p class="mb-0">El producto se ha creado exitosamente</p>
        </div>
        <div class="modal-footer border-0 justify-content-center">
          <button type="button" class="btn btn-primary" @click="goToProductList">
            <i class="bi bi-list-ul me-2"></i>
            Ver Lista de Productos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import productService from '@/services/productService'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { Modal } from 'bootstrap'

export default {
  components: { HeaderComponent },
  setup() {
    const saving = ref(false)
    const error = ref(null)
    const success = ref(null)
    const imageError = ref(false)
    const router = useRouter()

    const formData = ref({
      name: '',
      price: '',
      category: '',
      image: '',
      description: ''
    })

    const handleSubmit = async () => {
      saving.value = true
      error.value = null
      
      try {
        const payload = {
          name: formData.value.name,
          price: parseFloat(formData.value.price),
          category: formData.value.category,
          image: formData.value.image || null,
          description: formData.value.description || null
        }
        
        await productService.createProduct(payload)
        
        // Mostrar modal de éxito
        const successModalElement = document.getElementById('successModal')
        const successModal = new Modal(successModalElement)
        successModal.show()
        
      } catch (err) {
        error.value = 'Error creando producto: ' + (err.message || err)
        console.error(err)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } finally {
        saving.value = false
      }
    }

    const showCancelModal = () => {
      const modalElement = document.getElementById('cancelModal')
      const modal = new Modal(modalElement)
      modal.show()
    }

    const confirmCancel = () => {
      const modalElement = document.getElementById('cancelModal')
      const modal = Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
      router.push({ name: 'product' })
    }

    const goToProductList = () => {
      const modalElement = document.getElementById('successModal')
      const modal = Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
      router.push({ name: 'product' })
    }

    return { 
      saving, 
      error, 
      success,
      formData,
      imageError,
      handleSubmit,
      showCancelModal,
      confirmCancel,
      goToProductList
    }
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
  background: linear-gradient(45deg, #00f2ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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

.btn-back {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 242, 255, 0.3);
  color: #00f2ff;
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
}

.btn-back:hover {
  background: rgba(0, 242, 255, 0.1);
  border-color: rgba(0, 242, 255, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(0, 242, 255, 0.3);
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

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Form Container */
.form-container {
  background: linear-gradient(135deg, #1a2942, #0d1b2a);
  border: 2px solid rgba(0, 242, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 242, 255, 0.2);
}

.form-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(0, 242, 255, 0.2);
}

.form-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00f2ff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  color: #00f2ff;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-control {
  background: rgba(0, 242, 255, 0.05);
  border: 1px solid rgba(0, 242, 255, 0.2);
  border-radius: 8px;
  padding: 0.875rem 1rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: rgba(0, 242, 255, 0.5);
  background: rgba(0, 242, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(0, 242, 255, 0.1);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

.form-help {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Image Preview */
.image-preview-section {
  padding: 1rem;
  background: rgba(0, 242, 255, 0.05);
  border: 1px dashed rgba(0, 242, 255, 0.3);
  border-radius: 12px;
}

.image-preview {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.3);
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.image-error {
  padding: 3rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}

.image-error i {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 242, 255, 0.2);
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #00f2ff, #0dcaf0);
  color: #0a0e27;
  box-shadow: 0 4px 15px rgba(0, 242, 255, 0.4);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0dcaf0, #00f2ff);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 242, 255, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

.modal-title.text-success {
  color: #5cd68d !important;
}

.modal-icon {
  font-size: 1.5rem;
  color: #ffc107;
}

.futuristic-modal .modal-footer {
  border-top: 1px solid rgba(0, 242, 255, 0.2);
}

.text-warning-custom {
  color: #ffc107;
  display: flex;
  align-items: center;
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

.success-animation {
  font-size: 5rem;
  color: #5cd68d;
  margin: 2rem 0;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
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

  .btn-back {
    width: 100%;
    justify-content: center;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .btn-text {
    display: inline;
  }
}
</style>