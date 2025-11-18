import { createRouter, createWebHistory } from 'vue-router'

import MainLayout from '@/views/MainLayout.vue'
import HomeView from '../views/home/HomeView.vue'
import { useAuthStore } from '@/stores';
import { getTokenFromLocalStorage } from '@/helpers';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'sabores', name: 'sabores', component: () => import('../views/SaborView.vue') },
      { path: 'tamaños', name: 'tamaños', component: () => import('../views/TamañoView.vue') },
      { path: 'presentaciones', name: 'presentaciones', component: () => import('../views/PresentacionesView.vue') },
      { path: 'ventas', name: 'ventas', component: () => import('../views/VentaView.vue') },
      {
        path: 'registrar-venta',
        name: 'registrar-venta',
        component: () => import('@/views/RegistrarVentaView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Implementación del guard de navegación global
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación
  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout(); // Limpiar el estado del store
    authStore.returnUrl = to.path; // Guardar la URL para redirigir después del login
    return next('/login'); // Redirigir al login
  }

  next(); // Continuar con la navegación
});

export default router;