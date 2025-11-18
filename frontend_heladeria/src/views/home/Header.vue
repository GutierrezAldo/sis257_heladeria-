<template>
  <!-- inicio sección header -->
  <div class="header_section">
    <!-- inicio sección banner -->
    <div class="banner_section layout_padding">
      <div class="container">
        <div class="carousel slide">
          <!-- Contenedor del carousel con overflow hidden para las transiciones -->
          <div class="carousel-container">
            <div class="carousel-inner" :style="{ transform: `translateX(-${current * 25}%)` }">
              <div v-for="(slide, idx) in slides" :key="idx" class="carousel-item">
                <div class="container">
                  <div class="row">
                    <div class="col-sm-6">
                      <h1 class="banner_taital">{{ slide.title }}</h1>
                      <p class="banner_text">{{ slide.text }}</p>
                      <div class="started_text"><a href="#">¡Haz tu pedido!</a></div>
                    </div>
                    <div class="col-sm-6">
                      <div class="banner_img">
                        <img :src="slide.img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Indicadores arriba -->
          <ol class="carousel-indicators">
            <li
              v-for="idx in slides.length"
              :key="idx - 1"
              :class="{ active: idx - 1 === current }"
              @click="goTo(idx - 1)"
              style="width: 50px; height: 10px; border-radius: 3px"
            ></li>
          </ol>

          <!-- Controles movidos abajo del carousel -->
          <div class="carousel-controls-bottom">
            <a class="carousel-control-prev custom-carousel-control" href="#" @click.prevent="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true">‹</span>
              <span class="sr-only">Anterior</span>
            </a>
            <a class="carousel-control-next custom-carousel-control" href="#" @click.prevent="next">
              <span class="carousel-control-next-icon" aria-hidden="true">›</span>
              <span class="sr-only">Siguiente</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- fin sección banner -->
  </div>
  <!-- fin sección header -->
</template>

<script>
import { useAuthStore } from '@/stores'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import bannerImg from '@/assets/images/banner-img.png'

export default {
  setup() {
    // Pinia store
    const authStore = useAuthStore()
    const isLoggedIn = computed(() => !!authStore.token)

    // Dropdown personalizado (para la solución 2)
    const isDropdownOpen = ref(false)

    // Carrusel
    const slides = [
      {
        title: 'Helados Artesanales',
        text: 'Disfruta de nuestros helados hechos con ingredientes frescos y naturales, perfectos para cualquier ocasión.',
        img: bannerImg,
      },
      {
        title: 'Sabores Únicos',
        text: 'Explora una variedad de sabores exclusivos que solo encontrarás en nuestra heladería.',
        img: bannerImg,
      },
      {
        title: 'Promociones Especiales',
        text: 'Aprovecha nuestras ofertas y combos especiales para compartir con amigos y familia.',
        img: bannerImg,
      },
      {
        title: 'Ambiente Familiar',
        text: 'Ven y vive una experiencia agradable en un ambiente acogedor y familiar.',
        img: bannerImg,
      },
    ]

    // Funciones del dropdown personalizado
    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value
    }

    const closeDropdown = () => {
      isDropdownOpen.value = false
    }

    // Funciones de navegación que cierran el dropdown
    const navigateToProducts = () => {
      closeDropdown()
      // this.$router.push('/admin/productos');
    }

    const navigateToFlavors = () => {
      closeDropdown()
      // this.$router.push('/admin/sabores');
    }

    const navigateToTamaños = () => {
      closeDropdown()
      // this.$router.push('/admin/tamaños');
    }

    const navigateToSales = () => {
      closeDropdown()
      // this.$router.push('/admin/ventas');
    }

    // Cerrar dropdown al hacer click fuera
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-custom')) {
        isDropdownOpen.value = false
      }
    }

    // Estado y lógica del carrusel
    const current = ref(0)
    let interval = null

    function startAuto() {
      interval = setInterval(next, 4000)
    }
    function next() {
      current.value = (current.value + 1) % slides.length
    }
    function prev() {
      current.value = (current.value - 1 + slides.length) % slides.length
    }
    function goTo(idx) {
      current.value = idx
    }

    onMounted(() => {
      startAuto()
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      clearInterval(interval)
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      authStore,
      isLoggedIn,
      slides,
      current,
      next,
      prev,
      goTo,
      navigateToProducts,
      navigateToFlavors,
      navigateToTamaños,
      navigateToSales,
      isDropdownOpen,
      toggleDropdown,
    }
  },
}
</script>

<style scoped>
/* Estilos para el texto de bienvenida */
.welcome-text {
  color: #333;
  font-weight: 500;
  font-size: 14px;
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

/* Contenedor del carousel con overflow hidden */
.carousel-container {
  overflow: hidden;
  width: 100%;
  position: relative;
}

/* Transición suave lateral */
.carousel-inner {
  display: flex;
  width: 400%;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  flex: 0 0 25%;
  width: 25%;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.carousel-item .container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Controles posicionados abajo */
.carousel-controls-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
}

.custom-carousel-control {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e91e63;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border: 2px solid #e91e63;
  text-decoration: none;
  transition: all 0.3s ease;
}

.custom-carousel-control:hover {
  background: #e91e63;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(233, 30, 99, 0.3);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background: none;
  font-size: 20px;
  font-weight: bold;
  width: auto;
  height: auto;
}

/* Indicadores centrados arriba */
.carousel-indicators {
  position: static;
  margin: 0 0 10px 0;
  justify-content: center;
}

.carousel-indicators li {
  background-color: rgba(233, 30, 99, 0.5);
  border: 1px solid #e91e63;
}

.carousel-indicators .active {
  background-color: #e91e63;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .carousel-controls-bottom {
    gap: 15px;
    margin-top: 20px;
  }

  .custom-carousel-control {
    width: 45px;
    height: 45px;
    font-size: 20px;
  }

  .welcome-text {
    display: none;
  }

  .dropdown-menu-custom {
    right: -50px;
    min-width: 180px;
  }
}

.nav-item:hover > .nav-link {
  color: #e91e63 !important;
}
</style>
