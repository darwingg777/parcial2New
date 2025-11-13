<template>
  <div class="futuristic-wrapper">
    <HeaderComponent />
    
    <div class="container-fluid">
      <!-- Hero Section -->
      <section class="row justify-content-center py-5 hero-section">
        <div class="col-lg-10 text-center">
          <div class="hero-content">
            <h1 class="display-1 fw-bold mb-3 gradient-text">DigiStore</h1>
            <p class="lead fs-3 text-cyan mb-4">Tecnología del futuro, disponible hoy</p>
            <div class="row justify-content-center g-3">
              <div class="col-md-3 col-sm-6">
                <div class="card bg-dark border-cyan stat-card">
                  <div class="card-body text-center">
                    <h3 class="display-4 text-cyan mb-0">{{ productos.length }}</h3>
                    <p class="text-muted mb-0">Productos</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="card bg-dark border-cyan stat-card">
                  <div class="card-body text-center">
                    <h3 class="display-4 text-cyan mb-0">2075</h3>
                    <p class="text-muted mb-0">Año Tech</p>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="card bg-dark border-cyan stat-card">
                  <div class="card-body text-center">
                    <h3 class="display-4 text-cyan mb-0">∞</h3>
                    <p class="text-muted mb-0">Innovación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products Section -->
      <section class="row py-5">
        <div class="col-12">
          <div class="text-center mb-5">
            <h2 class="display-4 fw-bold mb-3">
              <span class="gradient-text">Catálogo Futurista</span>
            </h2>
            <p class="lead text-muted">Productos que cambiarán tu realidad</p>
          </div>

          <!-- Loading Spinner -->
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-cyan" style="width: 3rem; height: 3rem;" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-3 text-cyan">Cargando productos del futuro...</p>
          </div>

          <!-- Error Message -->
          <div v-else-if="error" class="alert alert-danger text-center" role="alert">
            <h4 class="alert-heading">Error al cargar productos</h4>
            <p>{{ error }}</p>
          </div>

          <!-- Products Grid -->
          <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            <div v-for="product in productos" :key="product.id" class="col">
              <div class="card h-100 product-card border-0 shadow-lg">
                <div class="card-img-wrapper position-relative overflow-hidden">
                  <img 
                    :src="product.image" 
                    class="card-img-top" 
                    :alt="product.name"
                    @error="handleImageError"
                  />
                  <div class="card-img-overlay d-flex align-items-start justify-content-between p-3">
                    <span class="badge bg-cyan text-dark fw-bold">ID: {{ String(product.id).padStart(4, '0') }}</span>
                  </div>
                  <div class="corner-decor corner-tl"></div>
                  <div class="corner-decor corner-tr"></div>
                  <div class="corner-decor corner-bl"></div>
                  <div class="corner-decor corner-br"></div>
                </div>
                <div class="card-body d-flex flex-column bg-dark-gradient">
                  <h5 class="card-title fw-bold text-white mb-3">{{ product.name }}</h5>
                  <p class="card-text text-muted flex-grow-1 small">{{ product.description }}</p>
                  <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary">
                    <div>
                      <small class="text-muted d-block text-uppercase" style="font-size: 0.7rem;">Precio</small>
                      <span class="h4 text-cyan fw-bold mb-0">{{ product.price }}</span>
                    </div>
                    <button class="btn btn-cyan btn-futuristic">
                      Comprar
                      <i class="ms-1">→</i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && !error && productos.length === 0" class="text-center py-5">
            <div class="display-1 mb-3">🔍</div>
            <h3 class="text-muted">No hay productos disponibles</h3>
            <p class="text-muted">Por favor, verifica que el archivo products.json esté disponible.</p>
          </div>
        </div>
      </section>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import productsData from "@/assets/products.json";
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import { onMounted, ref } from "vue";

export default {
  name: "ProductoView",
  components: {
    HeaderComponent,
    FooterComponent
  },
  setup() {
    const productos = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const cargarProductos = () => {
      try {
        loading.value = true;
        error.value = null;
        
        console.log('Datos cargados:', productsData); // Para debug
        
        // Verificar si los datos vienen en el formato correcto
        productos.value = productsData.products || productsData || [];
        
        console.log('Productos:', productos.value); // Para debug
        
      } catch (err) {
        console.error("Error cargando productos:", err);
        error.value = `No se pudieron cargar los productos: ${err.message}`;
      } finally {
        loading.value = false;
      }
    };

    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/400x250/1a1f3a/00f2ff?text=Imagen+No+Disponible';
    };

    onMounted(() => {
      cargarProductos();
    });

    return {
      productos,
      loading,
      error,
      handleImageError
    };
  },
};
</script>

<style scoped>
/* Variables y Base */
.futuristic-wrapper {
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1325 100%);
  min-height: 100vh;
  color: #fff;
}

.text-cyan {
  color: #00f2ff !important;
}

.bg-cyan {
  background-color: #00f2ff !important;
}

.border-cyan {
  border-color: #00f2ff !important;
}

/* Hero Section */
.hero-section {
  background: radial-gradient(circle at center, rgba(0, 242, 255, 0.1) 0%, transparent 70%);
  position: relative;
  margin-top: 2rem;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-text {
  background: linear-gradient(45deg, #00f2ff, #ff00ff, #00f2ff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite;
  text-shadow: 0 0 30px rgba(0, 242, 255, 0.5);
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.stat-card {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: rgba(26, 31, 58, 0.6) !important;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 242, 255, 0.3) !important;
  border-color: #ff00ff !important;
}

/* Product Cards */
.product-card {
  background: linear-gradient(135deg, #1a1f3a 0%, #0f1325 100%);
  border: 1px solid rgba(0, 242, 255, 0.3) !important;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }
.product-card:nth-child(4) { animation-delay: 0.4s; }
.product-card:nth-child(5) { animation-delay: 0.5s; }
.product-card:nth-child(6) { animation-delay: 0.6s; }

.product-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 242, 255, 0.4) !important;
  border-color: #00f2ff !important;
}

.product-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #00f2ff, #ff00ff, #00f2ff);
  background-size: 400% 400%;
  border-radius: 0.5rem;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
  animation: gradientRotate 3s ease infinite;
}

@keyframes gradientRotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.product-card:hover::before {
  opacity: 0.6;
}

.card-img-wrapper {
  height: 250px;
  position: relative;
}

.card-img-top {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .card-img-top {
  transform: scale(1.1);
}

.bg-dark-gradient {
  background: linear-gradient(to bottom, #1a1f3a, #0f1325) !important;
}

/* Corner Decorations */
.corner-decor {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00f2ff;
  z-index: 2;
}

.corner-tl {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
}

.corner-bl {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
}

.corner-br {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

/* Buttons */
.btn-futuristic {
  position: relative;
  overflow: hidden;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  font-size: 0.85rem;
}

.btn-cyan {
  background: linear-gradient(45deg, #00f2ff, #00c8d4);
  color: #0a0e27;
  border: none;
}

.btn-cyan:hover {
  background: linear-gradient(45deg, #00c8d4, #00f2ff);
  color: #0a0e27;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 242, 255, 0.4);
}

.btn-cyan::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-cyan:hover::before {
  width: 300px;
  height: 300px;
}

/* Spinner */
.spinner-border.text-cyan {
  border-color: #00f2ff;
  border-right-color: transparent;
}

/* Responsive */
@media (max-width: 768px) {
  .display-1 {
    font-size: 3rem;
  }
  
  .display-4 {
    font-size: 2rem;
  }
  
  .card-img-wrapper {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .btn-futuristic {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
}
</style>