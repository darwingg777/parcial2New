<template>
  <div class="clientes-wrapper">
    <HeaderComponent />

    <div class="container-fluid py-4">
      <!-- Header Section -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="header-card">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h1 class="gradient-text mb-2">Gestión de Clientes</h1>
                <p class="text-muted mb-0">
                  Administra los usuarios de DigiStore
                </p>
              </div>
              <button class="btn btn-primary" @click="showCreateModal">
                <i class="bi bi-plus-lg"></i> Nuevo Cliente
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <h3>{{ clientes.length }}</h3>
              <p>Total Clientes</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-info">
              <h3>{{ clientes.length }}</h3>
              <p>Activos</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="stat-card">
            <div class="stat-icon">📧</div>
            <div class="stat-info">
              <h3>{{ clientes.length }}</h3>
              <p>Con Email</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div
          class="spinner-border text-primary"
          style="width: 3rem; height: 3rem"
        >
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3 text-muted">Cargando clientes...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Error</h4>
        <p>{{ error }}</p>
        <button class="btn btn-primary mt-2" @click="cargarClientes">
          Reintentar
        </button>
      </div>

      <!-- Tabla de Clientes -->
      <div v-else class="row">
        <div class="col-12">
          <div class="table-card">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Fecha Registro</th>
                    <th class="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cliente in clientes" :key="cliente.id">
                    <td>
                      <span class="badge bg-primary">{{
                        String(cliente.id).padStart(3, "0")
                      }}</span>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="user-avatar">
                          {{ cliente.email.charAt(0).toUpperCase() }}
                        </div>
                        <span class="ms-2">{{ cliente.email }}</span>
                      </div>
                    </td>
                    <td>
                      <small class="text-muted">
                        {{ formatDate(cliente.createdAt) }}
                      </small>
                    </td>
                    <td class="text-center">
                      <button
                        class="btn btn-sm btn-edit me-2"
                        @click="editarCliente(cliente)"
                        title="Editar"
                      >
                        <i class="bi bi-pencil-fill"></i>
                        <span class="btn-text">Editar</span>
                      </button>
                      <button
                        class="btn btn-sm btn-delete"
                        @click="confirmarEliminar(cliente)"
                        title="Eliminar"
                      >
                        <i class="bi bi-trash-fill"></i>
                        <span class="btn-text">Eliminar</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Empty State -->
              <div v-if="clientes.length === 0" class="text-center py-5">
                <div class="empty-state">
                  <i
                    class="bi bi-people"
                    style="font-size: 4rem; color: #6c757d"
                  ></i>
                  <h4 class="mt-3 text-muted">No hay clientes registrados</h4>
                  <p class="text-muted">Comienza agregando tu primer cliente</p>
                  <button class="btn btn-primary mt-3" @click="showCreateModal">
                    <i class="bi bi-plus-lg"></i> Agregar Cliente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Crear/Editar -->
    <div v-if="showModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ editando ? "Editar Cliente" : "Nuevo Cliente" }}</h2>
          <button class="btn-close" @click="cerrarModal">&times;</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardarCliente">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="cliente@email.com"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="••••••••"
                :required="!editando"
              />
              <small class="text-muted" v-if="editando">
                Deja en blanco para mantener la contraseña actual
              </small>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-secondary"
                @click="cerrarModal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="guardando"
              >
                <span
                  v-if="guardando"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ guardando ? "Guardando..." : "Guardar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Eliminar -->
    <div
      v-if="showDeleteModal"
      class="modal-overlay"
      @click.self="showDeleteModal = false"
    >
      <div class="modal-content modal-small">
        <div class="modal-header">
          <h2>Confirmar Eliminación</h2>
        </div>
        <div class="modal-body">
          <p>¿Estás seguro de que deseas eliminar al cliente?</p>
          <p class="text-danger fw-bold">{{ clienteEliminar?.email }}</p>
          <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-secondary" @click="showDeleteModal = false">
              Cancelar
            </button>
            <button
              class="btn btn-danger"
              @click="eliminarCliente"
              :disabled="eliminando"
            >
              <span
                v-if="eliminando"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import apiService from "@/services/apiService";

export default {
  name: "ClientesView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  setup() {
    const clientes = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editando = ref(false);
    const guardando = ref(false);
    const eliminando = ref(false);
    const clienteEliminar = ref(null);

    const form = ref({
      email: "",
      password: "",
    });

    // Cargar clientes
    const cargarClientes = async () => {
      loading.value = true;
      error.value = null;
      try {
        const response = await apiService.login.getAllUsers();
        clientes.value = response.data;
      } catch (err) {
        console.error("Error cargando clientes:", err);
        error.value = "Error al cargar los clientes";
      } finally {
        loading.value = false;
      }
    };

    // Formatear fecha
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    // Mostrar modal crear
    const showCreateModal = () => {
      editando.value = false;
      form.value = { email: "", password: "" };
      showModal.value = true;
    };

    // Editar cliente
    const editarCliente = (cliente) => {
      editando.value = true;
      form.value = {
        id: cliente.id,
        email: cliente.email,
        password: "",
      };
      showModal.value = true;
    };

    // Cerrar modal
    const cerrarModal = () => {
      showModal.value = false;
      form.value = { email: "", password: "" };
      editando.value = false;
    };

    // Guardar cliente
    const guardarCliente = async () => {
      guardando.value = true;
      try {
        const data = {
          email: form.value.email,
        };

        // Solo incluir password si se proporcionó
        if (form.value.password) {
          data.password = form.value.password;
        }

        if (editando.value) {
          await apiService.login.updateUser(form.value.id, data);
        } else {
          data.password = form.value.password || "password123";
          await apiService.login.createUser(data);
        }

        await cargarClientes();
        cerrarModal();
      } catch (err) {
        console.error("Error guardando cliente:", err);
        alert("Error al guardar el cliente");
      } finally {
        guardando.value = false;
      }
    };

    // Confirmar eliminar
    const confirmarEliminar = (cliente) => {
      clienteEliminar.value = cliente;
      showDeleteModal.value = true;
    };

    // Eliminar cliente
    const eliminarCliente = async () => {
      eliminando.value = true;
      try {
        await apiService.login.deleteUser(clienteEliminar.value.id);
        await cargarClientes();
        showDeleteModal.value = false;
        clienteEliminar.value = null;
      } catch (err) {
        console.error("Error eliminando cliente:", err);
        alert("Error al eliminar el cliente");
      } finally {
        eliminando.value = false;
      }
    };

    onMounted(() => {
      cargarClientes();
    });

    return {
      clientes,
      loading,
      error,
      showModal,
      showDeleteModal,
      editando,
      guardando,
      eliminando,
      clienteEliminar,
      form,
      cargarClientes,
      formatDate,
      showCreateModal,
      editarCliente,
      cerrarModal,
      guardarCliente,
      confirmarEliminar,
      eliminarCliente,
    };
  },
};
</script>

<style scoped>
.clientes-wrapper {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1325 100%);
  min-height: 100vh;
  color: #fff;
}

.gradient-text {
  background: linear-gradient(45deg, #00f2ff, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.header-card {
  background: rgba(26, 31, 58, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 242, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
}

.stat-card {
  background: rgba(26, 31, 58, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 242, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: #00f2ff;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info h3 {
  color: #00f2ff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.stat-info p {
  color: #a0aec0;
  margin: 0;
  font-size: 0.9rem;
}

.table-card {
  background: rgba(26, 31, 58, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 242, 255, 0.3);
  border-radius: 12px;
  overflow: hidden;
}

.table {
  margin: 0;
  color: #fff;
}

.table thead {
  background: rgba(0, 242, 255, 0.1);
}

.table thead th {
  color: #00f2ff;
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 242, 255, 0.3);
  padding: 1rem;
}

.table tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.3s ease;
}

.table tbody tr:hover {
  background: rgba(0, 242, 255, 0.05);
}

.table tbody td {
  padding: 1rem;
  vertical-align: middle;
  border: none;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00f2ff, #ff00ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
}

.badge {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.btn-primary {
  background: linear-gradient(45deg, #00f2ff, #00c8d4);
  color: #0a0e27;
  border: none;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 242, 255, 0.4);
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background: #00f2ff;
  color: #0a0e27;
}

.btn-edit:hover {
  background: #00c8d4;
  transform: translateY(-2px);
}

.btn-delete {
  background: #dc3545;
  color: #fff;
}

.btn-delete:hover {
  background: #c82333;
  transform: translateY(-2px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 22, 40, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: #1e2a44;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(0, 242, 255, 0.3);
}

.modal-small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  color: #fff;
  margin: 0;
  font-size: 1.5rem;
}

.btn-close {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  padding: 0;
}

.btn-close:hover {
  color: #00f2ff;
}

.modal-body {
  padding: 1.5rem;
}

.form-label {
  color: #fff;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-control {
  background: #0a0e27;
  border: 1px solid rgba(0, 242, 255, 0.3);
  color: #fff;
  padding: 0.75rem;
  border-radius: 8px;
}

.form-control:focus {
  background: #0a0e27;
  border-color: #00f2ff;
  box-shadow: 0 0 0 0.2rem rgba(0, 242, 255, 0.25);
  color: #fff;
}

.btn-secondary {
  background: #6c757d;
  color: #fff;
  border: none;
  font-weight: 600;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-danger {
  background: #dc3545;
  color: #fff;
  border: none;
  font-weight: 600;
}

.btn-danger:hover {
  background: #c82333;
}

.alert {
  border-radius: 8px;
}

.empty-state {
  padding: 3rem 1rem;
}

.text-primary {
  color: #00f2ff !important;
}

.spinner-border {
  border-color: currentColor;
  border-right-color: transparent;
}
/* Botones de acción */
.btn-edit,
.btn-delete {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 8px;
  border: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

.btn-edit i,
.btn-delete i {
  font-size: 1rem;
}

/* Responsive: ocultar texto en pantallas pequeñas */
@media (max-width: 768px) {
  .btn-text {
    display: none;
  }
  
  .btn-edit,
  .btn-delete {
    padding: 0.5rem;
    gap: 0;
  }
}
</style>
