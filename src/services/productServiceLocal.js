    import axios from 'axios'

    // API de Google Books
    const API_URL = 'https://www.googleapis.com/books/v1/volumes'
    const API_KEY = 'AIzaSyBXm_WLSr-L4sCGB5QLJx0f3xJq6Xc0GFw' // Key pública de ejemplo

    // Simulación de almacenamiento local para los libros
    let librosLocales = []
    let nextId = 1

    const cargarLibrosDeLocalStorage = () => {
    const librosGuardados = localStorage.getItem('libros')
    if (librosGuardados) {
        librosLocales = JSON.parse(librosGuardados)
        const maxId = Math.max(...librosLocales.map(l => l.id), 0)
        nextId = maxId + 1
        return true
    }
    return false
    }

    const guardarLibrosEnLocalStorage = () => {
    localStorage.setItem('libros', JSON.stringify(librosLocales))
    }

    export default {
    // Obtener todos los libros
    async getAllProducts() {
        try {
        if (cargarLibrosDeLocalStorage()) {
            return librosLocales
        }

        // Si ya tenemos libros locales, devolverlos
        if (librosLocales.length > 0) {
            return librosLocales
        }

        // Buscar libros en español sobre varios temas
        const temas = ['ficción', 'historia', 'ciencia', 'arte']
        const promesas = temas.map(tema =>
            axios.get(`${API_URL}?q=${tema}&langRestrict=es&maxResults=5&key=${API_KEY}`)
        )

        const resultados = await Promise.all(promesas)

        librosLocales = resultados.flatMap(response =>
            response.data.items.map((item) => ({
            id: nextId++,
            title: item.volumeInfo.title || 'Sin título',
            price: (Math.random() * (50 - 10) + 10).toFixed(2),
            category: item.volumeInfo.categories?.[0] || 'General',
            description: item.volumeInfo.description || 'Sin descripción disponible',
            image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/200x300?text=Sin+Imagen',
            rating: {
                rate: item.volumeInfo.averageRating || (Math.random() * (5 - 3) + 3).toFixed(1),
                count: item.volumeInfo.ratingsCount || Math.floor(Math.random() * 200)
            },
            author: item.volumeInfo.authors?.[0] || 'Autor desconocido',
            publisher: item.volumeInfo.publisher || 'Editorial desconocida',
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A'
            }))
        )

        guardarLibrosEnLocalStorage()
        return librosLocales
        } catch (error) {
        console.error('Error al obtener libros:', error)
        // Devolver libros de ejemplo si falla la API
        return this.getLibrosEjemplo()
        }
    },

    // Obtener un libro por ID
    async getProductById(id) {
        const libros = await this.getAllProducts()
        return libros.find(libro => libro.id === id)
    },

    // Crear un libro nuevo
    async createProduct(product) {
        const nuevoLibro = {
        ...product,
        id: nextId++,
        rating: { rate: 0, count: 0 }
        }
        librosLocales.push(nuevoLibro)
        guardarLibrosEnLocalStorage()
        return nuevoLibro
    },

    // Actualizar un libro
    async updateProduct(id, product) {
        const index = librosLocales.findIndex(libro => libro.id === id)
        if (index !== -1) {
        librosLocales[index] = { ...librosLocales[index], ...product }
        guardarLibrosEnLocalStorage()
        return librosLocales[index]
        }
        throw new Error('Libro no encontrado')
    },

    // Eliminar un libro
    async deleteProduct(id) {
        const index = librosLocales.findIndex(libro => libro.id === id)
        if (index !== -1) {
        librosLocales.splice(index, 1)
        guardarLibrosEnLocalStorage()
        return { success: true, id }
        }
        throw new Error('Libro no encontrado')
    }
    }