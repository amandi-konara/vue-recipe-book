import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipeCard from '@/components/RecipeCard.vue';
import RecipeDetails from '@/components/RecipeDetails.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/recipe/:id',
      name: 'RecipeDetail',
      component: () => import('@/components/RecipeDetails.vue')
    }
    
  ],
})

export default router
