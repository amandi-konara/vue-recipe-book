import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Recipe } from '@/types/Recipe'

export const useFavoritesStore = defineStore('favorites', () => {
  // Load from localStorage if it exists
  const favorites = ref<Recipe[]>(
    JSON.parse(localStorage.getItem('favorites') ?? '[]')
  )

  // Auto save to localStorage whenever favorites changes
  watch(favorites, (val) => {
    localStorage.setItem('favorites', JSON.stringify(val))
  }, { deep: true })

  function addFavorite(recipe: Recipe) {
    if (!isFavorite(recipe.id)) {
      favorites.value.push(recipe)
    }
  }

  function removeFavorite(id: number) {
    favorites.value = favorites.value.filter(r => r.id !== id)
  }

  function isFavorite(id: number) {
    return favorites.value.some(r => r.id === id)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
})