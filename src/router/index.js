import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Garden',
      component: () => import('@/views/GardenView.vue')
    },
    {
      path: '/allplants',
      name: 'All Plants',
      component: () => import('@/views/GetAllView.vue'),
    },
  ],
})

export default router