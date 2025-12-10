import axios from "axios";

const BASE_URL = "https://6921a105512fb4140be0d33c.mockapi.io/api/v1";
// En apiService.js, al inicio del archivo, después de importar axios
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Opcional: Interceptor para respuestas
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ============================================
// PRODUCTOS
// ============================================
const productsAPI = {
  // Obtener todos los productos
  getAllProducts() {
    return axios.get(`${BASE_URL}/products`);
  },

  // Obtener un producto por ID
  getProductById(id) {
    return axios.get(`${BASE_URL}/products/${id}`);
  },

  // Crear un nuevo producto
  createProduct(data) {
    return axios.post(`${BASE_URL}/products`, data);
  },

  // Actualizar un producto existente
  updateProduct(id, data) {
    return axios.put(`${BASE_URL}/products/${id}`, data);
  },

  // Eliminar un producto
  deleteProduct(id) {
    return axios.delete(`${BASE_URL}/products/${id}`);
  },
};

// ============================================
// LOGIN / USUARIOS
// ============================================
const loginAPI = {
  // Obtener todos los usuarios
  getAllUsers() {
    return axios.get(`${BASE_URL}/Login`);
  },

  // Obtener un usuario por ID
  getUserById(id) {
    return axios.get(`${BASE_URL}/Login/${id}`);
  },

  // Crear un nuevo usuario (Registro)
  createUser(data) {
    return axios.post(`${BASE_URL}/Login`, data);
  },

  // Actualizar un usuario
  updateUser(id, data) {
    return axios.put(`${BASE_URL}/Login/${id}`, data);
  },

  // Eliminar un usuario
  deleteUser(id) {
    return axios.delete(`${BASE_URL}/Login/${id}`);
  },

  // Login - Verificar credenciales
  // En tu método login del apiService.js
  async login(email, password) {
    try {
      const response = await axios.get(`${BASE_URL}/Login`);
      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // ✅ Guardar usuario en localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");

        // ✅ GUARDAR EL TOKEN si existe en la respuesta
        if (user.token) {
          localStorage.setItem("authToken", user.token);
        } else {
          // Si MockAPI no tiene token, crea uno simulado
          const mockToken = `mock-token-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2)}`;
          localStorage.setItem("authToken", mockToken);
        }

        return {
          success: true,
          user,
          token: localStorage.getItem("authToken"), // Devuelve el token
          message: "Login exitoso",
        };
      } else {
        return {
          success: false,
          message: "Email o contraseña incorrectos",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Error al iniciar sesión: ${error.message}`,
      };
    }
  },

  // ✅ Añade método para obtener el token
  getToken() {
    return localStorage.getItem("authToken");
  },

  // ✅ Actualiza logout para limpiar el token también
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authToken"); // Añade esto
    return { success: true, message: "Sesión cerrada" };
  },

  // ✅ Actualiza isAuthenticated para verificar token también
  isAuthenticated() {
    const hasAuth = localStorage.getItem("isAuthenticated") === "true";
    const hasToken = localStorage.getItem("authToken") !== null;
    return hasAuth && hasToken; // Ambas deben ser true
  },

  // Obtener usuario actual
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si el email ya existe (para registro)
  async checkEmailExists(email) {
    try {
      const response = await axios.get(`${BASE_URL}/Login`);
      return response.data.some((u) => u.email === email);
    } catch (error) {
      console.error("Error verificando email:", error);
      return false;
    }
  },

  // Registro de nuevo usuario
  async register(email, password) {
    try {
      // Verificar si el email ya existe
      const emailExists = await this.checkEmailExists(email);

      if (emailExists) {
        return {
          success: false,
          message: "Este email ya está registrado",
        };
      }

      // Crear el nuevo usuario
      const response = await axios.post(`${BASE_URL}/Login`, {
        email,
        password,
      });

      return {
        success: true,
        user: response.data,
        message: "Usuario registrado exitosamente",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error al registrar: ${error.message}`,
      };
    }
  },
};

// ============================================
// EXPORTAR TODO
// ============================================
export default {
  products: productsAPI,
  login: loginAPI,
};
