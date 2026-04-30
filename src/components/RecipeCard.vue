<script setup lang="ts">
import type { Recipe } from '../types/Recipe'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  recipe: Recipe
}>()
</script>

<template>
  <router-link
    :to="`/recipe/${recipe.id}`"
    class="cursor-pointer bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <img
      :src="recipe.image"
      :alt="recipe.name"
      class="w-full h-40 object-cover"
    />

    <div class="p-4">
      <h2 class="text-lg font-bold mb-1 truncate">{{ recipe.name }}</h2>

      <p class="text-sm text-gray-500 mb-2">🍽 {{ recipe.cuisine }}</p>

      <div class="flex justify-between text-sm text-gray-400">
        <span>⏱ Prep: {{ recipe.prepTimeMinutes }} min</span>
        <span>🍳 Cook: {{ recipe.cookTimeMinutes }} min</span>
      </div>

      <p class="text-xs text-gray-400 mt-1">👥 Serves: {{ recipe.servings }}</p>
    </div>
  
  </router-link>
</template>