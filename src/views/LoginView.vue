<template>
  <body>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-6 col-lg-5">
          <div class="login-card">
            <div class="login-header">
              <h1>🛒 DigiStore</h1>
              <p>Tu tienda de productos digitales</p>
            </div>

            <form @submit.prevent="login" id="loginForm">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="email"
                  placeholder="Ingresa tu email"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Contraseña</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="password"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>

              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1"
                  >Recordarme</label
                >
              </div>

              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>

              <div v-if="success" class="alert alert-success" role="alert">
                {{ success }}
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ loading ? "Iniciando..." : "Iniciar Sesión" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import apiService from "@/services/apiService";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const success = ref("");
    const loading = ref(false);

    // En LoginView.vue - en el método login
const login = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const result = await apiService.login.login(email.value, password.value);

    if (result.success) {
      success.value = "¡Login exitoso! Redirigiendo...";
      
      // ✅ DEBUG: Verifica el token
      console.log('Token guardado:', localStorage.getItem('authToken'));
      console.log('Resultado completo:', result);
      
      // Redirigir
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      error.value = result.message;
    }
  } catch (err) {
    console.error("Error en login:", err);
    error.value = "Error al conectar con el servidor";
  } finally {
    loading.value = false;
  }
};
    
    const fillTestCredentials = () => {
      email.value = "admin@digistore.com";
      password.value = "admin123";
    };

    return {
      email,
      password,
      error,
      success,
      loading,
      login,
      fillTestCredentials,
    };
  },
};
</script>

<style scoped>
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 420px;
  width: 100%;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.login-header p {
  color: #6c757d;
  margin: 0;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 12px;
  font-weight: 600;
  transition: transform 0.2s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.alert {
  border-radius: 8px;
  font-size: 0.9rem;
}

.test-credentials {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.credential-box {
  background: #f8f9fa;
  border: 1px dashed #dee2e6;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.credential-box:hover {
  background: #e9ecef;
  border-color: #667eea;
  transform: scale(1.02);
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15rem;
}
</style>
