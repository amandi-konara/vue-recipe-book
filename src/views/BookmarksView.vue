<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import RecipeCard from '@/components/RecipeCard.vue'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 px-6 py-6">
    
    <h1 class="text-3xl font-bold mb-6 dark:text-white">Bookmarks</h1>

    <p v-if="favoritesStore.favorites.length === 0" class="text-center text-gray-500 dark:text-gray-400">
      No bookmarks yet. Go add some recipes!
    </p>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <RecipeCard
        v-for="recipe in favoritesStore.favorites"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>

  </div>
</template>