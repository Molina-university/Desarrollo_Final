# 📚 Sistema de Gestión de Libros


Una aplicación web moderna para gestionar tu biblioteca digital 📖

--- 


# 🌟 Características Principales
## ✨ Gestión Completa de Libros

➕ Crear nuevos libros con información detallada
✏️ Editar libros existentes
🗑️ Eliminar libros con confirmación
👁️ Ver detalles completos de cada libro

## 🔐 Sistema de Autenticación

Login seguro con validación
Protección de rutas privadas
Persistencia de sesión
Cierre de sesión

## 👥 Gestión de Usuarios

CRUD completo de usuarios
Asignación de roles
Validación de datos

## 🎨 Interfaz Moderna

Diseño responsivo para todos los dispositivos
Modales interactivos
Notificaciones en tiempo real
Paginación inteligente


# 🚀 Inicio Rápido
Prerequisitos
Asegúrate de tener instalado:

```
Node.js (v16 o superior)
npm o yarn
Un navegador moderno
```

---

## Instalación

- Clona el repositorio

```
bashgit clone https://github.com/tu-usuario/gestion-libros-vue.git
cd gestion-libros-vue
```

- Instala las dependencias

```
bashnpm install
```

- Configura las variables de entorno (opcional)
Crea un archivo .env en la raíz del proyecto:

```
envVITE_API_BASE_URL=https://693b82a19b80ba7262cd7d2c.mockapi.io/api/v1
```

- Inicia el servidor de desarrollo

```
bashnpm run dev
```

- Abre tu navegador

```
Navega a http://localhost:5173 🎉
```

---

# 📁 Estructura del Proyecto
```
gestion-libros-vue/
├── 📂 public/              # Archivos estáticos
├── 📂 src/
│   ├── 📂 assets/          # Imágenes, estilos globales
│   │   └── 📂 styles/      # CSS personalizados
│   ├── 📂 components/      # Componentes reutilizables
│   │   ├── FooterComponent.vue
│   │   ├── HelloWorld.vue
│   │   ├── NavbarComponent.vue
│   │   ├── ProductCardComponent.vue
│   │   └── SidebarComponent.vue
│   ├── 📂 data/            # Datos mock 
│   │   └── usuarios.json
│   ├── 📂 router/          # Configuración de rutas
│   │   └── index.js
│   ├── 📂 services/        # Servicios de API
│   │   ├── apiService.js
│   │   ├── productService.js
│   │   └── productServiceLocal.js
│   ├── 📂 views/           # Vistas/Páginas
│   │   ├── ClientesView.vue
│   │   ├── DashboardView.vue
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── ProductView.vue
│   │   └── ValoracionesView.vue
│   ├── App.vue             # Componente raíz
│   └── main.js             # Punto de entrada
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js

```

# 🛠️ Tecnologías Utilizadas
Frontend        
```
Tecnología            Versión                  Uso
Vue.js               3.4.x                Framework principal
Vue                  Router4.2.x          Enrutamiento SPA
Bootstrap            5.3.x                Framework CSS
Bootstrap            Icons1.11.x          IconografíaAxios1.6.xCliente HTTP
```
Backend (MockAPI)

MockAPI: REST API simulada para desarrollo
Endpoints: /Libros, /usuarios, /clientes, /valoraciones

- Herramientas de Desarrollo

Vite: Build tool y dev server ultra-rápido
ESLint: Linter para mantener código limpio
Git: Control de versiones


# 🎯 Funcionalidades Detalladas
## 🔐 Autenticación
```  
javascript// Login de ejemplo
Email: admin@libreria.com
Password: admin123
``` 
Validación de credenciales
Almacenamiento seguro en localStorage
Redirección automática
Guards de navegación

# 📚 Gestión de Libros
## Campos de libro:

Título
Autor
Editorial
Categoría
Precio
ISBN
Descripción
Imagen (URL)

## Operaciones:

✅ CREATE: Agregar nuevos libros
✅ READ: Listar y ver detalles
✅ UPDATE: Editar información
✅ DELETE: Eliminar con confirmación

## 👥 Gestión de Usuarios

CRUD completo
Roles: Admin, Usuario, Cliente
Validación de emails
Passwords encriptados (simulado)

## 🎨 Interfaz de Usuario
Características UX:

Diseño mobile-first responsivo
Modales de Bootstrap 5
Toasts para notificaciones
Loading states
Error handling
Breadcrumbs de navegación


# 📝 Scripts Disponibles
``` 
bash# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Previsualiza build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
``` 

# 🔗 API Endpoints
Base URL
``` 
https://693b82a19b80ba7262cd7d2c.mockapi.io/api/v1
Libros
``` 

``` 
-------------------------------------------------------
Método     |     Endpoint      |    Descripción
-------------------------------------------------------
GET/       |     /Libros       |   Obtener todos los libros
-------------------------------------------------------
GET        |     /Libros/:id   |   Obtener un libro específico
-------------------------------------------------------
POST       |     /Libros        |   Crear nuevo libro
-------------------------------------------------------
PUT        |     /Libros/:id     |    Actualizar libro
-------------------------------------------------------
DELETE     |     /Libros/:id     |    Eliminar libro
-------------------------------------------------------
```
```
-------------------------------------------------------
Usuarios
-------------------------------------------------------
Método        |    Endpoint        |      Descripción
-------------------------------------------------------
GET           |  /usuarios         |     Obtener todos los usuarios
-------------------------------------------------------
POST          |   /usuarios        |      Crear nuevo usuario
-------------------------------------------------------
PUT           |   /usuarios/:id    |      Actualizar usuario
-------------------------------------------------------
DELETE        |   /usuarios/:id    |       Eliminar usuario
-------------------------------------------------------
``` 

# 🐛 Solución de Problemas
```
Error: "Cannot GET /api/..."
```
Solución: Verifica que la URL de MockAPI esté correcta en apiService.js
Los datos no se cargan
Solución:

Verifica tu conexión a internet
Comprueba la consola del navegador (F12)
Asegúrate de que MockAPI esté activo

Error al eliminar o editar
Solución: Verifica que los IDs sean strings, no números

❌ Incorrecto
```
deleteProduct(123)
```


// ✅ Correcto

```
deleteProduct("123")
```

## 🐛 Corregido

Error en endpoint de libros (mayúsculas/minúsculas)
Problema con IDs en operaciones UPDATE/DELETE


## 📄 Licencia
Este proyecto fue desarrollado con fines educativos para el curso de Ing sistemas en UFPSO.
Distribuido bajo la Licencia MIT. Ver LICENSE para más información.

# 👥 Autores
Equipo de Desarrollo:

### 👤 [Jhoan Molina Gomez 192490  ] - https://github.com/Molina-university
### 👤 [Paula Echavez Vargas 192487] - https://github.com/paula8787