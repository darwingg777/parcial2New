<template>
  <div class="table-wrapper">
    <table class="futuristic-table">
      <thead>
        <tr>
          <th>
            <i class="bi bi-box-seam th-icon"></i>
            Nombre
          </th>
          <th>
            <i class="bi bi-currency-dollar th-icon"></i>
            Precio
          </th>
          <th>
            <i class="bi bi-tag th-icon"></i>
            Categoría
          </th>
          <th class="text-center">
            <i class="bi bi-gear th-icon"></i>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="products.length === 0">
          <td colspan="4" class="empty-state">
            <div class="empty-content">
              <i class="bi bi-inbox empty-icon"></i>
              <p class="empty-text">No hay productos disponibles</p>
              <p class="empty-subtext">Agrega tu primer producto para comenzar</p>
            </div>
          </td>
        </tr>
        <tr v-for="p in products" :key="p.id" class="table-row">
          <td class="product-name">
            <span class="name-badge">
              <i class="bi bi-box me-2"></i>
              {{ p.name }}
            </span>
          </td>
          <td class="product-price">
            <span class="price-tag">
              <i class="bi bi-cash-stack me-2"></i>
              ${{ p.price }}
            </span>
          </td>
          <td class="product-category">
            <span class="category-badge">
              <i class="bi bi-bookmark-fill me-2"></i>
              {{ p.category }}
            </span>
          </td>
          <td class="text-center action-cell">
            <div class="action-buttons">
              <button 
                class="btn-action btn-edit" 
                @click="$emit('edit', p.id)"
                title="Editar producto"
              >
                <i class="bi bi-pencil-square btn-icon"></i>
                <span class="btn-label">Editar</span>
              </button>
              <button 
                class="btn-action btn-delete" 
                @click="confirmDelete(p)"
                title="Eliminar producto"
              >
                <i class="bi bi-trash3-fill btn-icon"></i>
                <span class="btn-label">Eliminar</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Modal de confirmación -->
  <div class="modal fade" id="deleteProductModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content futuristic-modal">
        <div class="modal-header border-0">
          <h5 class="modal-title">
            <i class="bi bi-exclamation-triangle modal-icon"></i>
            Confirmar Eliminación
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p class="mb-2">¿Estás seguro de que deseas eliminar el producto?</p>
          <p class="product-info" v-if="productToDelete">
            <i class="bi bi-box-seam me-2"></i>
            <strong>{{ productToDelete.name }}</strong>
          </p>
          <p class="text-warning-custom mb-0">
            <i class="bi bi-info-circle me-2"></i>
            <small>Esta acción no se puede deshacer</small>
          </p>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            <i class="bi bi-x-circle me-2"></i>
            Cancelar
          </button>
          <button type="button" class="btn btn-danger-custom" @click="executeDelete">
            <i class="bi bi-trash3 me-2"></i>
            Eliminar Producto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Modal } from 'bootstrap'

export default {
  props: ['products'],
  emits: ['edit', 'delete'],
  
  setup(props, { emit }) {
    const productToDelete = ref(null)
    
    const confirmDelete = (product) => {
      productToDelete.value = product
      const modalElement = document.getElementById('deleteProductModal')
      const modal = new Modal(modalElement)
      modal.show()
    }
    
    const executeDelete = () => {
      if (productToDelete.value) {
        emit('delete', productToDelete.value.id)
        
        // Cerrar modal
        const modalElement = document.getElementById('deleteProductModal')
        const modal = Modal.getInstance(modalElement)
        if (modal) {
          modal.hide()
        }
        
        productToDelete.value = null
      }
    }
    
    return {
      confirmDelete,
      executeDelete,
      productToDelete
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
}

.futuristic-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: transparent;
}

/* Header Styles */
.futuristic-table thead {
  background: linear-gradient(135deg, rgba(0, 242, 255, 0.1), rgba(255, 0, 255, 0.1));
  position: sticky;
  top: 0;
  z-index: 10;
}

.futuristic-table th {
  padding: 1.25rem 1rem;
  text-align: left;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00f2ff;
  border-bottom: 2px solid rgba(0, 242, 255, 0.3);
  white-space: nowrap;
}

.th-icon {
  font-size: 1.1rem;
  margin-right: 0.5rem;
  display: inline-block;
  vertical-align: middle;
}

/* Body Styles */
.futuristic-table tbody {
  background: transparent;
}

.table-row {
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 242, 255, 0.1);
}

.table-row:hover {
  background: linear-gradient(90deg, rgba(0, 242, 255, 0.05), transparent);
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0, 242, 255, 0.1);
}

.futuristic-table td {
  padding: 1rem;
  color: #e0e0e0;
  font-size: 0.95rem;
  vertical-align: middle;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem !important;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 4rem;
  color: rgba(0, 242, 255, 0.3);
}

.empty-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #00f2ff;
  margin: 0;
}

.empty-subtext {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* Product Name */
.product-name {
  font-weight: 600;
}

.name-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: rgba(0, 242, 255, 0.1);
  border: 1px solid rgba(0, 242, 255, 0.3);
  border-radius: 8px;
  color: #00f2ff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.name-badge:hover {
  background: rgba(0, 242, 255, 0.15);
  border-color: rgba(0, 242, 255, 0.5);
}

/* Product Price */
.price-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.2), rgba(40, 167, 69, 0.1));
  border: 1px solid rgba(40, 167, 69, 0.4);
  border-radius: 8px;
  color: #5cd68d;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.price-tag:hover {
  background: linear-gradient(135deg, rgba(40, 167, 69, 0.3), rgba(40, 167, 69, 0.15));
  border-color: rgba(40, 167, 69, 0.6);
}

/* Product Category */
.category-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(255, 0, 255, 0.15), rgba(138, 43, 226, 0.1));
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 8px;
  color: #ff00ff;
  font-weight: 600;
  transition: all 0.3s ease;
}

.category-badge:hover {
  background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(138, 43, 226, 0.15));
  border-color: rgba(255, 0, 255, 0.5);
}

/* Action Buttons */
.action-cell {
  padding: 0.75rem !important;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
}

.btn-icon {
  font-size: 1rem;
}

.btn-edit {
  background: linear-gradient(135deg, #0dcaf0, #0891b2);
  color: white;
  box-shadow: 0 2px 8px rgba(13, 202, 240, 0.3);
}

.btn-edit:hover {
  background: linear-gradient(135deg, #0891b2, #0e7490);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 202, 240, 0.5);
}

.btn-delete {
  background: linear-gradient(135deg, #dc3545, #b02a37);
  color: white;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}

.btn-delete:hover {
  background: linear-gradient(135deg, #b02a37, #8b2332);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.5);
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
  color: #ffc107;
}

.futuristic-modal .modal-footer {
  border-top: 1px solid rgba(0, 242, 255, 0.2);
}

.product-info {
  padding: 0.75rem;
  background: rgba(0, 242, 255, 0.1);
  border-left: 3px solid #00f2ff;
  border-radius: 4px;
  color: #00f2ff;
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
  .btn-label {
    display: none;
  }
  
  .btn-action {
    padding: 0.6rem;
    gap: 0;
  }
  
  .action-buttons {
    gap: 0.5rem;
  }

  .futuristic-table th,
  .futuristic-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }

  .name-badge,
  .price-tag,
  .category-badge {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .name-badge i,
  .price-tag i,
  .category-badge i {
    display: none;
  }
}
</style>