<template>
  <nav class="col-md-3 col-lg-2 d-md-block bg-light SidebarComponent">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link active" href="#">
            Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Productos
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Categorías
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Ventas
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Reportes
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Configuración
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SidebarComponent"
};
</script>

<style scoped>
.sidebar {
  height: calc(100vh - 56px);
  overflow-y: auto;
}

.nav-link {
  color: #333;
  padding: 0.75rem 1rem;
}

.nav-link.active {
  background-color: #0d6efd;
  color: white;
}

.nav-link:hover {
  background-color: #e9ecef;
}
</style>