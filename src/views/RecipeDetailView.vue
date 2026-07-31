<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Recipe } from '@/types/Recipe'
import { useFavoritesStore } from '@/stores/favorites'
import { BookmarkIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/vue/24/solid'
import { ClockIcon, FireIcon, UserGroupIcon, StarIcon } from '@heroicons/vue/24/outline'

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
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-3xl mx-auto px-6 py-8 dark:text-white">

      <!-- Back button -->
      <button
        @click="router.back()"
        class="flex items-center gap-1 mb-6 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition text-sm font-medium"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        Back
      </button>

      <div v-if="loading" class="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading...
      </div>
      <div v-else-if="error" class="text-center py-10 text-red-500 dark:text-red-400">
        {{ error }}
      </div>

      <div v-else-if="recipe">

        <!-- Recipe Image -->
        <img
          :src="recipe.image"
          :alt="recipe.name"
          class="w-full h-72 object-cover rounded-2xl mb-6 shadow-md"
        />

        <!-- Title + Bookmark -->
        <div class="flex items-start justify-between mb-3">
          <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ recipe.name }}</h1>
          <button
            @click="toggleFavorite"
            class="ml-4 p-2 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            :title="isFav ? 'Remove from bookmarks' : 'Add to bookmarks'"
          >
            <BookmarkSolid v-if="isFav" class="w-6 h-6 text-green-500" />
            <BookmarkIcon v-else class="w-6 h-6 text-gray-400 dark:text-gray-300" />
          </button>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <span class="flex items-center gap-1">
            <ClockIcon class="w-4 h-4 text-green-500" /> Prep: {{ recipe.prepTimeMinutes }} min
          </span>
          <span class="flex items-center gap-1">
            <FireIcon class="w-4 h-4 text-orange-400" /> Cook: {{ recipe.cookTimeMinutes }} min
          </span>
          <span class="flex items-center gap-1">
            <UserGroupIcon class="w-4 h-4 text-blue-400" /> Servings: {{ recipe.servings }}
          </span>
          <span class="flex items-center gap-1">
            <StarIcon class="w-4 h-4 text-yellow-400" /> {{ recipe.rating }}
          </span>
        </div>

        <!-- Ingredients -->
        <div class="mb-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Ingredients</h2>
          <ul class="space-y-2">
            <li
              v-for="(item, i) in recipe.ingredients"
              :key="i"
              class="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <span class="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Instructions</h2>
          <ol class="space-y-4">
            <li
              v-for="(step, i) in recipe.instructions"
              :key="i"
              class="flex gap-3 text-gray-700 dark:text-gray-300"
            >
              <span class="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 text-white text-sm flex items-center justify-center font-bold">
                {{ i + 1 }}
              </span>
              {{ step }}
            </li>
          </ol>
        </div>

      </div>
    </div>
  </div>
</template>