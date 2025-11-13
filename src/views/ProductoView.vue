<template>
  <div>
    <HeaderComponent />
    
    <div class="container-fluid">
      <div class="row">
        
        
        <main class="col-md-9 col-lg-10 px-md-4">
          <section class="py-5 text-center bg-light rounded mt-4">
            <h2>Bienvenido a DigiStore</h2>
            <p class="lead">Los mejores productos digitales para impulsar tu negocio</p>
          </section>

          <section class="py-5">
            <h3 class="mb-4">Nuestros Productos</h3>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div v-for="product in productos" :key="product.id" class="col" >
                <div class="card h-100">
                  <img :src="product.image" class="card-img-top" :alt="product.name" />
                  <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text fw-bold">${{ product.price }}</p>
                    <button class="btn btn-primary w-100">Comprar Ahora</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "ProductoView",
  components: {
    HeaderComponent,
 
    FooterComponent
  },
  setup() {
    const productos = ref([]);

    const cargarProductos = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        productos.value = data.products || data;
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    onMounted(() => {
      cargarProductos();
    });

    return {
      productos
    };
  },
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>