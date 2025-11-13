<template>
  <footer class="bg-dark text-white mt-5">
    <div class="container py-4">
      <div class="row">
        <div class="col-md-4">
          <h5>DigiStore</h5>
          <p>Tu tienda digital de confianza</p>
        </div>
        <div class="col-md-4">
          <h5>Enlaces</h5>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white-50">Sobre Nosotros</a></li>
            <li><a href="#" class="text-white-50">Términos y Condiciones</a></li>
            <li><a href="#" class="text-white-50">Política de Privacidad</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contacto</h5>
          <p class="text-white-50">Email: info@digistore.com</p>
          <p class="text-white-50">Tel: +57 123 456 7890</p>
        </div>
      </div>
      <hr class="bg-white">
      <div class="text-center">
        <p class="mb-0">&copy; 2024 DigiStore. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
footer a:hover {
  color: white !important;
  text-decoration: none;
}
</style>