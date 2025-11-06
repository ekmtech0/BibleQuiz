import { createRouter, createWebHistory } from 'vue-router'


 export const routes = [
    {
      path: '/',
      name: '/Home-main',
      component:() => import('@/Views/Home-main.vue'),
    },
    {
      path: '/Header-Expo',
      name: '/Header-Expo',
      component: () => import('@/Views/Home-main.vue')
   },
   {
     path: '/NomeExpo',
     name: 'NomeExpo',
     component: () => import('@/Views/NomeExpo.vue')
   }, 
   {
     path: '/JogoExpo',
     name: 'JogoExpo',
     component: () => import('@/Views/JogoExpo.vue')
   },
   {
     path: '/FinalExpo',
     name: 'FinalExpo',
     component: () => import('@/Views/FinalExpo.vue')
   }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})
export default router
