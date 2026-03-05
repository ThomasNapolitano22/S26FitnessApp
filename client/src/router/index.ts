import { createRouter, createWebHistory } from 'vue-router'
import LandingComponent from '@/components/LandingComponent.vue'
import InformationalsComponent from '@/components/InformationalsComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingComponent,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: InformationalsComponent
    },
  ],
})

export default router
