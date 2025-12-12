import axios from 'axios'

const MOCKAPI_BASE_URL = 'https://693b82a19b80ba7262cd7d2c.mockapi.io/api/v1'

const apiClient = axios.create({
    baseURL: MOCKAPI_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default {
    get(endpoint) {
        return apiClient.get(endpoint)
    },

    post(endpoint, data) {
        return apiClient.post(endpoint, data)
    },

    put(endpoint, data) {
        return apiClient.put(endpoint, data)
    },

    delete(endpoint) {
        return apiClient.delete(endpoint)
    }
}