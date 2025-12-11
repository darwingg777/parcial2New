# 🚀 DigiStore - Tienda de Productos Tecnológicos Futuristas

![DigiStore Banner](banner-placeholder)

## 📋 Descripción
DigiStore es una aplicación web moderna desarrollada con **Vue.js 3** que presenta un catálogo de productos tecnológicos futuristas. El proyecto cuenta con un diseño cyberpunk/futurista con animaciones fluidas, efectos de gradiente y una experiencia de usuario inmersiva, conectado a una API REST mediante **MockAPI**.

## ✨ Características Principales
- 🎨 **Diseño Futurista**: Interfaz con estética cyberpunk usando colores cyan (#00f2ff) y púrpura (#ff00ff)
- 📱 **Totalmente Responsive**: Adaptado para móviles, tablets y escritorio usando Bootstrap 5
- ⚡ **Animaciones Suaves**: Efectos hover, transiciones y animaciones de gradiente
- 🛍️ **Catálogo de Productos**: Gestión completa de productos tecnológicos futuristas con CRUD
- 👥 **Gestión de Usuarios**: Sistema CRUD completo para usuarios
- 🌐 **Integración con MockAPI**: Conexión a API REST falsa para desarrollo y testing
- 📊 **Dashboard Administrativo**: Panel de control con estadísticas y acciones rápidas
- 🎯 **Componentes Reutilizables**: Arquitectura modular con componentes Vue
- 🔒 **Sistema de Sesión**: Manejo básico de autenticación con localStorage
- 🔄 **Operaciones CRUD**: Create, Read, Update, Delete para productos y usuarios

## 🛠️ Tecnologías Utilizadas
- **Vue.js 3** - Framework progresivo de JavaScript
- **Vue Router** - Enrutamiento de aplicación
- **Bootstrap 5** - Framework CSS para diseño responsive
- **Vite** - Herramienta de compilación rápida
- **JavaScript ES6+** - Sintaxis moderna de JavaScript
- **CSS3** - Animaciones y estilos personalizados
- **MockAPI** - API REST falsa para desarrollo
- **Axios/Fetch** - Cliente HTTP para consumo de API

## 📁 Estructura del Proyecto
```
digistore/
├── src/
│   ├── services/
│   │   └── apiService.js          # Servicio de conexión con MockAPI
│   ├── components/
│   │   ├── HeaderComponent.vue    # Barra de navegación
│   │   ├── FooterComponent.vue    # Pie de página
│   │   └── SidebarComponent.vue   # Menú lateral
│   ├── views/
│   │   ├── ProductoView.vue       # Vista de productos
│   │   ├── LoginView.vue          # Vista de login
│   │   └── DashboardView.vue      # Panel administrativo
│   ├── router/
│   │   └── index.js               # Configuración de rutas
│   ├── App.vue                    # Componente raíz
│   └── main.js                    # Punto de entrada
├── public/
│   └── index.html
├── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta en MockAPI (opcional para crear tu propia API)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/darwingg777/parcial2New.git
cd app-crud
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar MockAPI** (Opcional)
   - Crear una cuenta en [MockAPI.io](https://mockapi.io)
   - Crear dos endpoints: `/productos` y `/usuarios`
   - Actualizar la URL base en `src/services/apiService.js`

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
npm run serve
```

5. **Abrir en el navegador**
```
http://localhost:8000
```

## 🔌 API Service (apiService.js)

El archivo `src/services/apiService.js` gestiona todas las peticiones HTTP a MockAPI:

### Estructura del Servicio
```javascript
// Productos
- getProductos()      // GET - Obtener todos los productos
- getProducto(id)     // GET - Obtener un producto específico
- createProducto(data) // POST - Crear nuevo producto
- updateProducto(id, data) // PUT - Actualizar producto
- deleteProducto(id)  // DELETE - Eliminar producto

// Usuarios
- getUsuarios()       // GET - Obtener todos los usuarios
- getUsuario(id)      // GET - Obtener un usuario específico
- createUsuario(data) // POST - Crear nuevo usuario
- updateUsuario(id, data) // PUT - Actualizar usuario
- deleteUsuario(id)   // DELETE - Eliminar usuario
```

### Configuración de la API
```javascript
const API_URL = 'https://6921a105512fb4140be0d33c.mockapi.io/api/v1';
```

## 📦 Componentes Principales

### 🏠 ProductoView.vue
Vista principal que muestra el catálogo de productos con:
- Hero section con estadísticas en tiempo real
- Grid responsive de productos obtenidos desde MockAPI
- Tarjetas animadas con efectos hover
- Operaciones CRUD para productos
- Información completa de cada producto

### 📊 DashboardView.vue
Panel administrativo que incluye:
- Tarjetas de estadísticas (productos, ventas, clientes, pedidos)
- Sección de acciones rápidas
- Feed de actividad reciente
- Gestión de usuarios y productos
- Integración con sidebar

### 🎨 HeaderComponent.vue
Barra de navegación superior con:
- Logo animado con efecto pulse
- Enlaces de navegación con hover effects
- Botón de cerrar sesión
- Responsive con menú hamburguesa

### 📄 FooterComponent.vue
Pie de página con:
- Información de la empresa
- Enlaces rápidos y categorías
- Información de contacto
- Redes sociales con animaciones

### 📂 SidebarComponent.vue
Menú lateral administrativo con:
- Navegación por secciones
- Indicadores visuales de página activa
- Animaciones en hover
- Card promocional

## 🎨 Paleta de Colores
```css
/* Colores Principales */
--cyan-primary: #00f2ff;      /* Cyan brillante */
--purple-accent: #ff00ff;     /* Púrpura neón */
--dark-bg: #0a0e27;           /* Fondo oscuro principal */
--dark-secondary: #1a1f3a;    /* Fondo oscuro secundario */
--dark-tertiary: #0f1325;     /* Fondo oscuro terciario */
--text-muted: #8892b0;        /* Texto secundario */
```

## 📱 Características Responsive
- **Mobile First**: Diseñado primero para móviles
- **Breakpoints Bootstrap**:
  - `xs`: < 576px (1 columna)
  - `sm`: ≥ 576px (1-2 columnas)
  - `md`: ≥ 768px (2-3 columnas)
  - `lg`: ≥ 992px (3-4 columnas)
  - `xl`: ≥ 1200px (4 columnas)

## 🎯 Productos Incluidos

El catálogo incluye productos futuristas gestionados dinámicamente desde MockAPI:
1. Moto Voladora XT-5000 - $25,999
2. Apple Portal Pro - $89,999
3. Neural Glasses VR - $3,499
4. Tesla Hoverboard Pro - $4,999
5. Quantum Watch X - $12,999
6. Holographic Phone S27 - $7,899
7. Gravity Boots Pro - $8,499
8. Neural Translator Implant - $15,999
9. Personal Force Field - $32,999
10. Memory Upload Device - $45,999
11. Solar Jetpack Mark VII - $18,999
12. Smart Contact Lenses - $2,999

## 🔧 Configuración Adicional

### Modificar la URL de MockAPI
Edita `src/services/apiService.js`:
```javascript
const API_URL = 'https://tu-endpoint.mockapi.io/api/v1';
```

### Estructura de Datos en MockAPI

**Productos:**
```json
{
  "id": "1",
  "name": "Nombre del Producto",
  "description": "Descripción detallada",
  "price": "$XX,XXX",
  "image": "URL_de_la_imagen",
  "category": "categoria"
}
```

**Usuarios:**
```json
{
  "id": "1",
  "nombre": "Nombre Usuario",
  "email": "usuario@email.com",
  "rol": "admin",
  "avatar": "URL_del_avatar"
}
```

### Personalizar Colores
Edita las variables CSS en cada componente `.vue` para cambiar la paleta de colores.

## 🧪 Testing con MockAPI
MockAPI permite:
- ✅ Simular respuestas de API reales
- ✅ Probar operaciones CRUD sin backend
- ✅ Generar datos de prueba automáticamente
- ✅ Configurar delays y errores simulados
- ✅ Compartir endpoints con el equipo

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 👨‍💻 Autor
**Darwin Garmaria**
- GitHub: [@darwingg777](https://github.com/darwingg777)
- Email: darwingarmaria@gmail.com

---

⚡ **Hecho con 💙 para el futuro** ⚡

**DigiStore © 2024 - Todos los derechos reservados**