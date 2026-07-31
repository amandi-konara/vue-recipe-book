<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Recipe } from '@/types/Recipe'
import { useFavoritesStore } from '@/stores/favorites'
import { BookmarkIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/vue/24/solid'
import { 
  ClockIcon, 
  FireIcon, 
  UserGroupIcon, 
  StarIcon 
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const recipe = ref<Recipe | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const favoritesStore = useFavoritesStore()

const isFav = computed(() => {
  return recipe.value ? favoritesStore.isFavorite(recipe.value.id) : false
})

function toggleFavorite() {
  if (!recipe.value) return
  if (isFav.value) {
    favoritesStore.removeFavorite(recipe.value.id)
  } else {
    favoritesStore.addFavorite(recipe.value)
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${route.params.id}`)
    if (!response.ok) throw new Error('Recipe not found')
    recipe.value = await response.json()
  } catch (e) {
    error.value = 'Failed to load recipe.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="max-w-3xl mx-auto p-6 dark:text-white">
      <button
        @click="router.back()"
        class="mb-4 text-sm text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <div v-if="loading" class="text-center py-10 text-gray-500 dark:text-gray-400">Loading...</div>
      <div v-else-if="error" class="text-center py-10 text-red-500 dark:text-red-400">{{ error }}</div>

      <div v-else-if="recipe">
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full h-64 object-cover rounded-xl mb-6"
        />

        <!-- Title + Bookmark button -->
        <div class="flex items-center justify-between mb-2">
          <h1 class="text-3xl font-bold">{{ recipe.name }}</h1>
          <button
            @click="toggleFavorite"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            :title="isFav ? 'Remove from bookmarks' : 'Add to bookmarks'"
          >
            <BookmarkSolid v-if="isFav" class="w-7 h-7 text-green-500" />
            <BookmarkIcon v-else class="w-7 h-7 text-gray-400 dark:text-gray-300" />
          </button>
        </div>

        <div class="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <span class="flex items-center gap-1">
            <ClockIcon class="w-4 h-4" /> Prep: {{ recipe.prepTimeMinutes }} min
          </span>
          <span class="flex items-center gap-1">
            <FireIcon class="w-4 h-4" /> Cook: {{ recipe.cookTimeMinutes }} min
          </span>
          <span class="flex items-center gap-1">
            <UserGroupIcon class="w-4 h-4" /> Servings: {{ recipe.servings }}
          </span>
          <span class="flex items-center gap-1">
            <StarIcon class="w-4 h-4 text-yellow-400" /> {{ recipe.rating }}
          </span>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="(item, i) in recipe.ingredients" :key="i">{{ item }}</li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Instructions</h2>
          <ol class="list-decimal list-inside space-y-2">
            <li v-for="(step, i) in recipe.instructions" :key="i">{{ step }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>