import axios from 'axios'

const BASE_URL = 'https://6921a105512fb4140be0d33c.mockapi.io/api/v1'

// ============================================
// PRODUCTOS
// ============================================
const productsAPI = {
  // Obtener todos los productos
  getAllProducts() {
    return axios.get(`${BASE_URL}/products`)
  },

  // Obtener un producto por ID
  getProductById(id) {
    return axios.get(`${BASE_URL}/products/${id}`)
  },

  // Crear un nuevo producto
  createProduct(data) {
    return axios.post(`${BASE_URL}/products`, data)
  },

  // Actualizar un producto existente
  updateProduct(id, data) {
    return axios.put(`${BASE_URL}/products/${id}`, data)
  },

  // Eliminar un producto
  deleteProduct(id) {
    return axios.delete(`${BASE_URL}/products/${id}`)
  }
}

// ============================================
// LOGIN / USUARIOS
// ============================================
const loginAPI = {
  // Obtener todos los usuarios
  getAllUsers() {
    return axios.get(`${BASE_URL}/Login`)
  },

  // Obtener un usuario por ID
  getUserById(id) {
    return axios.get(`${BASE_URL}/Login/${id}`)
  },

  // Crear un nuevo usuario (Registro)
  createUser(data) {
    return axios.post(`${BASE_URL}/Login`, data)
  },

  // Actualizar un usuario
  updateUser(id, data) {
    return axios.put(`${BASE_URL}/Login/${id}`, data)
  },

  // Eliminar un usuario
  deleteUser(id) {
    return axios.delete(`${BASE_URL}/Login/${id}`)
  },

  // Login - Verificar credenciales
  async login(email, password) {
    try {
      const response = await axios.get(`${BASE_URL}/Login`)
      const user = response.data.find(
        u => u.email === email && u.password === password
      )
      
      if (user) {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isAuthenticated', 'true')
        
        return { 
          success: true, 
          user,
          message: 'Login exitoso' 
        }
      } else {
        return { 
          success: false, 
          message: 'Email o contraseña incorrectos' 
        }
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Error al iniciar sesión: ${error.message}` 
      }
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
    return { success: true, message: 'Sesión cerrada' }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true'
  },

  // Obtener usuario actual
  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Verificar si el email ya existe (para registro)
  async checkEmailExists(email) {
    try {
      const response = await axios.get(`${BASE_URL}/Login`)
      return response.data.some(u => u.email === email)
    } catch (error) {
      console.error('Error verificando email:', error)
      return false
    }
  },

  // Registro de nuevo usuario
  async register(email, password) {
    try {
      // Verificar si el email ya existe
      const emailExists = await this.checkEmailExists(email)
      
      if (emailExists) {
        return {
          success: false,
          message: 'Este email ya está registrado'
        }
      }

      // Crear el nuevo usuario
      const response = await axios.post(`${BASE_URL}/Login`, {
        email,
        password
      })

      return {
        success: true,
        user: response.data,
        message: 'Usuario registrado exitosamente'
      }
    } catch (error) {
      return {
        success: false,
        message: `Error al registrar: ${error.message}`
      }
    }
  }
}

// ============================================
// EXPORTAR TODO
// ============================================
export default {
  products: productsAPI,
  login: loginAPI
}