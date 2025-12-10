<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label">Nombre</label>
      <input v-model="local.name" required class="form-control" />
    </div>

    <div class="mb-3 row">
      <div class="col">
        <label class="form-label">Precio</label>
        <input v-model.number="local.price" type="number" step="0.01" min="0" required class="form-control" />
      </div>
      <div class="col">
        <label class="form-label">Categoría</label>
        <input v-model="local.category" class="form-control" />
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Descripción</label>
      <textarea v-model="local.description" rows="3" class="form-control"></textarea>
    </div>

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-secondary me-2" @click="$emit('cancel')">Cancelar</button>
      <button type="submit" class="btn btn-primary" :disabled="saving">
        <span v-if="saving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Guardar
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'

export default {
  props: {
    product: {
      type: Object,
      default: null
    },
    saving: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const local = reactive({
      title: '',
      price: null,
      category: '',
      description: '',
      imagen: ''
    })

    const resetFromProps = () => {
      if (props.product) {
        local.name = props.product.name ?? ''
        local.price = props.product.price ?? null
        local.category = props.product.category ?? ''
        local.description = props.product.description ?? ''
        local.imagen = props.product.imagen ?? ''
      } else {
        local.name = ''
        local.price = null
        local.category = ''
        local.description = ''
        local.imagen = ''
      }
    }

    watch(() => props.product, resetFromProps, { immediate: true })

    function onSubmit() {
      // validaciones adicionales si se requieren
      emit('submit', { ...local })
    }

    return { ...toRefs(local), local, onSubmit }
  }
}
</script>

<style scoped>
.form-label {
  font-weight: 600;
  color: #ffffff;
}
.form-control {
  background-color: #1e2a44;
  border: 1px solid #3a475e;
  color: #ffffff;
}
.form-control:focus {
  background-color: #1e2a44;
  border-color: #00d4ff;
  box-shadow: 0 0 0 0.2rem rgba(0,
    212,
    255,
    0.25);
  color: #ffffff;
}
.btn-primary {
  background: #00d4ff;
  color: #0a1628;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
.btn-primary:hover:not(:disabled) {
  background: #00b8e6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
}
.btn-secondary {
  background: #3a475e;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  background: #2c374e;
  transform: translateY(-1px);
}
</style>