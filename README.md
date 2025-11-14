# 🚀 DigiStore - Tienda de Productos Tecnológicos Futuristas

![DigiStore Banner](https://via.placeholder.com/1200x300/0a0e27/00f2ff?text=DigiStore+-+Tecnología+del+Futuro)

## 📋 Descripción

**DigiStore** es una aplicación web moderna desarrollada con Vue.js 3 que presenta un catálogo de productos tecnológicos futuristas. El proyecto cuenta con un diseño cyberpunk/futurista con animaciones fluidas, efectos de gradiente y una experiencia de usuario inmersiva.

### ✨ Características Principales

- 🎨 **Diseño Futurista**: Interfaz con estética cyberpunk usando colores cyan (#00f2ff) y púrpura (#ff00ff)
- 📱 **Totalmente Responsive**: Adaptado para móviles, tablets y escritorio usando Bootstrap 5
- ⚡ **Animaciones Suaves**: Efectos hover, transiciones y animaciones de gradiente
- 🛍️ **Catálogo de Productos**: 12 productos tecnológicos futuristas con imágenes, descripciones y precios
- 📊 **Dashboard Administrativo**: Panel de control con estadísticas y acciones rápidas
- 🎯 **Componentes Reutilizables**: Arquitectura modular con componentes Vue
- 🔒 **Sistema de Sesión**: Manejo básico de autenticación con localStorage

## 🛠️ Tecnologías Utilizadas

- **Vue.js 3** - Framework progresivo de JavaScript
- **Vue Router** - Enrutamiento de aplicación
- **Bootstrap 5** - Framework CSS para diseño responsive
- **Vite** - Herramienta de compilación rápida
- **JavaScript ES6+** - Sintaxis moderna de JavaScript
- **CSS3** - Animaciones y estilos personalizados

## 📁 Estructura del Proyecto

```
digistore/
├── src/
│   ├── assets/
│   │   └── products.json          # Catálogo de productos
│   │   └── usuarios.json         
│   ├── components/
│   │   ├── HeaderComponent.vue    # Barra de navegación
│   │   ├── FooterComponent.vue    # Pie de página
│   │   └── SidebarComponent.vue   # Menú lateral
│   ├── views/
│   │   ├── ProductoView.vue       # Vista de productos
│   │   ├── LoginView.vue       # Vista de productos
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

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   npm run serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:8000
   ```



## 📦 Componentes Principales

### 🏠 ProductoView.vue
Vista principal que muestra el catálogo de productos con:
- Hero section con estadísticas
- Grid responsive de productos
- Tarjetas animadas con efectos hover
- Información completa de cada producto

### 📊 DashboardView.vue
Panel administrativo que incluye:
- Tarjetas de estadísticas (productos, ventas, clientes, pedidos)
- Sección de acciones rápidas
- Feed de actividad reciente
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
  - xs: < 576px (1 columna)
  - sm: ≥ 576px (1-2 columnas)
  - md: ≥ 768px (2-3 columnas)
  - lg: ≥ 992px (3-4 columnas)
  - xl: ≥ 1200px (4 columnas)

## 🎯 Productos Incluidos

El catálogo incluye 12 productos futuristas:

1. **Moto Voladora XT-5000** - $25,999
2. **Apple Portal Pro** - $89,999
3. **Neural Glasses VR** - $3,499
4. **Tesla Hoverboard Pro** - $4,999
5. **Quantum Watch X** - $12,999
6. **Holographic Phone S27** - $7,899
7. **Gravity Boots Pro** - $8,499
8. **Neural Translator Implant** - $15,999
9. **Personal Force Field** - $32,999
10. **Memory Upload Device** - $45,999
11. **Solar Jetpack Mark VII** - $18,999
12. **Smart Contact Lenses** - $2,999

## 🔧 Configuración Adicional

### Modificar Productos

Edita el archivo `src/assets/products.json` para agregar, modificar o eliminar productos:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Nombre del Producto",
      "description": "Descripción detallada",
      "price": "$XX,XXX",
      "image": "URL_de_la_imagen",
      "category": "categoria"
    }
  ]
}
```

### Personalizar Colores

Edita las variables CSS en cada componente `.vue` para cambiar la paleta de colores.



## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [darwingg777](https://github.com/darwingg777)
- Email: darwingarmaria@gmail.com


⚡ **Hecho con 💙 para el futuro** ⚡

*DigiStore © 2024 - Todos los derechos reservados*
