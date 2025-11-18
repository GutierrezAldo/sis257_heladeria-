<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-container">
    <router-link class="navbar-brand" to="/"
      ><img src="@/assets/images/logo.png" alt="Logo"
    /></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Inicio</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#about">Nosotros</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#icecream">Helados</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#services">Servicios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#blog">Blog</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#contact">Contáctanos</a>
        </li>

        <!-- Dropdown personalizado con Vue -->
        <li class="nav-item dropdown-custom" v-if="isLoggedIn">
          <a
            class="nav-link"
            href="#"
            @click.prevent="toggleDropdown"
            :class="{ active: isDropdownOpen }"
          >
            <i class="fa fa-cog mr-1"></i> Administración
            <i class="fa fa-chevron-down ml-1" :class="{ 'rotate-180': isDropdownOpen }"></i>
          </a>
          <div class="dropdown-menu-custom" v-show="isDropdownOpen" @click.stop>
            <router-link class="dropdown-item-custom" to="/presentaciones" @click="closeDropdown">
              <i class="fa fa-star mr-2"></i> Presentaciones
            </router-link>
            <router-link class="dropdown-item-custom" to="/sabores" @click="closeDropdown">
              <i class="fa fa-star mr-2"></i> Sabores
            </router-link>
            <router-link class="dropdown-item-custom" to="/tamaños" @click="closeDropdown">
              <i class="fa fa-users mr-2"></i> Tamaños
            </router-link>
            <router-link class="dropdown-item-custom" to="/ventas" @click="closeDropdown">
              <i class="fa fa-users mr-2"></i> Ventas
            </router-link>
            <router-link class="dropdown-item-custom" to="/registrar-venta" @click="closeDropdown">
              <i class="fa fa-star mr-2"></i> Nueva Venta
            </router-link>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <div v-if="!isLoggedIn" class="login_bt">
          <router-link to="/login">
            Iniciar sesión
            <span style="color: #222222"><i class="fa fa-user" aria-hidden="true"></i></span>
          </router-link>
        </div>
        <div v-else class="d-flex align-items-center">
          <span class="welcome-text mr-4">¡Hola, {{ authStore.user || '' }}!</span>
          <button class="btn btn-danger btn-sm" @click.prevent="authStore.logout">
            Salir <i class="fa fa-sign-out ml-1" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores'
import { computed, ref } from 'vue'

const authStore = useAuthStore()
const isLoggedIn = computed(() => !!authStore.token)
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const closeDropdown = () => {
  isDropdownOpen.value = false
}
</script>

<style scoped>
/* Estilos para el texto de bienvenida */
.welcome-text {
  color: #333;
  font-weight: 500;
  font-size: 16px;
}

/* ESTILOS PARA Dropdown Personalizado */
.dropdown-custom {
  position: relative;
}

.dropdown-custom .nav-link {
  position: relative;
  transition: all 0.3s ease;
  color: rgba(255, 0, 166, 0.5) !important;
}

.dropdown-custom .nav-link:hover {
  color: rgba(255, 39, 251, 0.75) !important;
}

.dropdown-custom .fa-chevron-down {
  transition: transform 0.3s ease;
  font-size: 12px;
}

.dropdown-custom .fa-chevron-down.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-menu-custom {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  min-width: 200px;
  z-index: 1000;
  padding: 0.5rem 0;
  animation: fadeInDown 0.3s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item-custom {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-item-custom:hover {
  background-color: #e91e63;
  color: white !important;
  text-decoration: none;
}

.dropdown-item-custom:focus {
  outline: none;
  background-color: #e91e63;
  color: white !important;
}

.dropdown-item-custom:active {
  background-color: #c2185b;
  color: white !important;
}

.dropdown-item-custom i {
  width: 20px;
  color: #666;
  transition: color 0.3s ease;
}

.dropdown-item-custom:hover i,
.dropdown-item-custom:focus i,
.dropdown-item-custom:active i {
  color: #c2185b;
}

.nav-item:hover > .nav-link {
  color: #e91e63 !important;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
