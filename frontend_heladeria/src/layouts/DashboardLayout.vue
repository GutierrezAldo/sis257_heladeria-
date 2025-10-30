<template>
  <div class="d-flex">
    <!-- Sidebar (offcanvas en móvil) -->
    <div class="offcanvas-lg offcanvas-start bg-light" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel" data-bs-scroll="true">
      <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title" id="sidebarLabel">Heladería</h5>
        <button type="button" class="btn-close d-lg-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body p-0">
        <nav class="list-group list-group-flush">
          <RouterLink class="list-group-item list-group-item-action" to="/">🏠 Resumen</RouterLink>
          <RouterLink class="list-group-item list-group-item-action" to="/ventas">🧾 Ventas</RouterLink>
          <RouterLink class="list-group-item list-group-item-action" to="/sabores">🍨 Sabores</RouterLink>
          <RouterLink class="list-group-item list-group-item-action" to="/tamanyos">🍦 Tamaños</RouterLink>
          <RouterLink class="list-group-item list-group-item-action" to="/presentaciones">📦 Presentaciones</RouterLink>
          
          
        </nav>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-grow-1">
      <!-- Topbar -->
      <nav class="navbar navbar-expand-lg bg-body border-bottom sticky-top">
        <div class="container-fluid">
          <button class="btn btn-outline-secondary me-2 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
            ☰
          </button>
          <a class="navbar-brand fw-semibold" href="#">Heladeria Helarte</a>

          <div class="ms-auto d-flex align-items-center gap-2">
            <input class="form-control d-none d-md-block" type="search" placeholder="Buscar..." style="max-width: 240px;">
            <button class="btn btn-primary">Nueva venta</button>
          </div>
        </div>
      </nav>

      <!-- Aquí renderiza cada vista -->
      <main class="container py-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
@media (min-width: 992px) {
  /* Sidebar fijo en desktop */
  #sidebar {
    position: sticky !important;
    top: 0;
    height: 90vh;
    transform: none !important;
    visibility: visible !important;
  }
}
</style>