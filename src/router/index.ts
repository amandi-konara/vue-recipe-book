import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: () => import('@/views/BookmarksView.vue')
    }
  ],
})

export default router