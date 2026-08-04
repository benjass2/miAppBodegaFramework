import { createRouter, createWebHistory } from 'vue-router'
import POSView from '@/views/POSView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'pos',
      component:POSView, 
    },
    {
      path:'/productos',
      name:'products-admin',
      component:()=>import('@/views/ProductsAdminView.vue'),
    },
    {
      path:'/historial',
      name:'history',
      component:()=>import('@/views/POSView.vue'),
    }
  ],
})

export default router
