import axios from 'axios'

const BASE_URL = 'https://6921a105512fb4140be0d33c.mockapi.io/api/v1'
const RESOURCE = `${BASE_URL}/products`

export default {
  // Obtener todos los productos
  getAllProducts() {
    return axios.get(RESOURCE)
  },

  // Obtener un producto por ID
  getProductById(id) {
    return axios.get(`${RESOURCE}/${id}`)
  },

  // Crear un nuevo producto
  createProduct(data) {
    return axios.post(RESOURCE, data)
  },

  // Actualizar un producto existente
  updateProduct(id, data) {
    return axios.put(`${RESOURCE}/${id}`, data)
  },

  // Eliminar un producto
  deleteProduct(id) {
    return axios.delete(`${RESOURCE}/${id}`)
  }
}
