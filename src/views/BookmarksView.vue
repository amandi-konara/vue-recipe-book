<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import RecipeCard from '@/components/RecipeCard.vue'
import { BookmarkIcon } from '@heroicons/vue/24/solid'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 px-8 py-8">

    <!-- Heading -->
    <div class="flex items-center gap-2 mb-6">
      <BookmarkIcon class="w-7 h-7 text-green-500" />
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white">Bookmarks</h1>
    </div>

    <!-- Empty state -->
    <div
      v-if="favoritesStore.favorites.length === 0"
      class="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500"
    >
      <BookmarkIcon class="w-16 h-16 mb-4 opacity-30" />
      <p class="text-lg">No bookmarks yet.</p>
      <p class="text-sm">Go explore some recipes and save your favorites!</p>
    </div>

    <!-- Recipe Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <RecipeCard
        v-for="recipe in favoritesStore.favorites"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>

  </div>
</template>