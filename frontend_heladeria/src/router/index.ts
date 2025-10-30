import { createRouter, createWebHistory } from 'vue-router';

import Ventas from '@/views/ventas.vue';
import Sabores from '@/views/Sabores.vue';
import Tamanyos from '@/views/Tamanyos.vue';
import Presentaciones from '@/views/Presentaciones.vue';
import DashboardHome from '@/views/DashboardHome.vue';

const routes = [
  { path: '/', component: DashboardHome, meta: { title: 'Resumen' } },
  { path: '/ventas', component: Ventas, meta: { title: 'Ventas' } },
  { path: '/sabores', component: Sabores, meta: { title: 'Sabores' } },
  { path: '/tamanyos', component: Tamanyos, meta: { title: 'Tamaños' } },
  { path: '/presentaciones', component: Presentaciones, meta: { title: 'Presentaciones' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  document.title = `Heladería · ${to.meta.title || ''}`;
});

export default router;