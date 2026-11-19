<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const authStore = useAuthStore()
const menuOpen = ref(false)
</script>

<template>
    <div class="container-fluid position-relative nav-bar p-0">
        <div class="container-lg position-relative p-0 px-lg-3" style="z-index: 9;">
            <nav class="navbar navbar-expand-lg bg-white navbar-light shadow p-lg-0">
                <RouterLink to="/" class="navbar-brand d-block d-lg-none">
                    <h1 class="m-0 display-4 text-primary">NOVA</h1>
                </RouterLink>
                <button
                    type="button"
                    class="navbar-toggler"
                    aria-label="Abrir menú de navegación"
                    @click="menuOpen = !menuOpen"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="navbarCollapse" class="collapse navbar-collapse justify-content-between" :class="{ show: menuOpen }">
                    <div class="navbar-nav ml-auto py-0">
                        <RouterLink to="/" class="nav-item nav-link">Inicio</RouterLink>
                        <RouterLink v-if="authStore.token" to="/productos" class="nav-item nav-link">Productos</RouterLink>
                        <RouterLink v-if="authStore.token" to="/clientes" class="nav-item nav-link">Clientes</RouterLink>
                        <RouterLink v-if="authStore.token" to="/empleados" class="nav-item nav-link">Empleados</RouterLink>
                    </div>
                    <RouterLink to="/" class="navbar-brand mx-5 d-none d-lg-block">
                        <h1 class="m-0 display-4 text-primary">NOVA</h1>
                    </RouterLink>
                    <div class="navbar-nav mr-auto py-0">
                        <RouterLink v-if="!authStore.token" to="/login" class="nav-item nav-link">Iniciar sesión</RouterLink>
                        <button v-else type="button" class="nav-item nav-link btn btn-link" @click="authStore.logout()">
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>
