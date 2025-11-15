import axios from 'axios'

// API de Google Books
const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = 'AIzaSyBXm_WLSr-L4sCGB5QLJx0f3xJq6Xc0GFw' // Key pública de ejemplo

// Simulación de almacenamiento local para los libros
let librosLocales = []
let nextId = 100

export default {
  // Obtener todos los libros
  async getAllProducts() {
    try {
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

      return librosLocales
    } catch (error) {
      console.error('Error al obtener libros:', error)
      // Devolver libros de ejemplo si falla la API
      return this.getLibrosEjemplo()
    }
  },

  // Libros de ejemplo por si falla la API
  getLibrosEjemplo() {
    return [
      {
        id: 1,
        title: 'Cien años de soledad',
        price: '25.99',
        category: 'Ficción',
        description: 'La obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/91TvVQS7loL.jpg',
        rating: { rate: 4.8, count: 1250 },
        author: 'Gabriel García Márquez',
        publisher: 'Editorial Sudamericana',
        isbn: '978-0307474728'
      },
      {
        id: 2,
        title: 'Don Quijote de la Mancha',
        price: '19.99',
        category: 'Clásicos',
        description: 'La obra cumbre de Miguel de Cervantes sobre las aventuras del ingenioso hidalgo.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/81v5tCLTnYL.jpg',
        rating: { rate: 4.7, count: 890 },
        author: 'Miguel de Cervantes',
        publisher: 'Real Academia Española',
        isbn: '978-8420412146'
      }
    ]
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
    return nuevoLibro
  },

  // Actualizar un libro
  async updateProduct(id, product) {
    const index = librosLocales.findIndex(libro => libro.id === id)
    if (index !== -1) {
      librosLocales[index] = { ...librosLocales[index], ...product }
      return librosLocales[index]
    }
    throw new Error('Libro no encontrado')
  },

  // Eliminar un libro
  async deleteProduct(id) {
    const index = librosLocales.findIndex(libro => libro.id === id)
    if (index !== -1) {
      librosLocales.splice(index, 1)
      return { success: true, id }
    }
    throw new Error('Libro no encontrado')
  }
}