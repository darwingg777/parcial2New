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
                <label for="exampleInputEmail1" class="form-label"
                  >Usuario</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="usuario"
                  placeholder="Ingresa tu usuario"
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

              <button type="submit" class="btn btn-primary w-100">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import usuariosData from "@/assets/usuarios.json";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const router = useRouter();
    const usuario = ref("");
    const password = ref("");
    const error = ref("");

    const login = () => {
      // Buscar usuario en el archivo JSON
      const usuarioValido = usuariosData.find(
        (u) => u.usuario === usuario.value && u.password === password.value
      );

      if (usuarioValido) {
        // Guardar sesión en localStorage
        localStorage.setItem(
          "sesion",
          JSON.stringify({ usuario: usuario.value })
        );

        // Redirigir al dashboard
        router.push("/dashboard");
      } else {
        error.value = "Usuario o contraseña incorrectos";
      }
    };

    return {
      usuario,
      password,
      error,
      login,
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
</style>
