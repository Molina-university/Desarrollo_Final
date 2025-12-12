import apiService from './apiService'

const ENDPOINT = '/Libros'

export default {
    async getAllProducts() {
        try {
            const response = await apiService.get(ENDPOINT)
            return response.data
        } catch (error) {
            console.error('Error al obtener productos:', error)
            throw error
        }
    },

    async getProductById(id) {
        try {
            const response = await apiService.get(`${ENDPOINT}/${id}`)
            return response.data
        } catch (error) {
            console.error('Error al obtener producto:', error)
            throw error
        }
    },

    async createProduct(product) {
        try {
            const response = await apiService.post(ENDPOINT, product)
            return response.data
        } catch (error) {
            console.error('Error al crear producto:', error)
            throw error
        }
    },

    async updateProduct(id, product) {
        try {
            const response = await apiService.put(`${ENDPOINT}/${id}`, product)
            return response.data
        } catch (error) {
            console.error('Error al actualizar producto:', error)
            throw error
        }
    },

    async deleteProduct(id) {
        try {
            await apiService.delete(`${ENDPOINT}/${id}`)
            return { success: true, id }
        } catch (error) {
            console.error('Error al eliminar producto:', error)
            throw error
        }
    }
}