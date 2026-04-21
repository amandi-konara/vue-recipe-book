<script setup lang="ts">
import type { Recipe } from '../types/recipe'

// defineProps tells Vue this component expects a 'recipe' object
// The type must match your Recipe interface exactly
defineProps<{
  recipe: Recipe
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">

    <!-- Recipe Image -->
    <img
      :src="recipe.image"
      :alt="recipe.name"
      class="w-full h-48 object-cover"
    />

    <!-- Recipe Details -->
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-1">{{ recipe.name }}</h2>
      <p class="text-sm text-gray-500 mb-2">{{ recipe.cuisine }}</p>

      <div class="flex gap-4 text-sm text-gray-600">
        <span>⏱ Prep: {{ recipe.prepTimeMinutes }} min</span>
        <span>🍳 Cook: {{ recipe.cookTimeMinutes }} min</span>
      </div>

      <p class="text-sm mt-2">🍽 Serves: {{ recipe.servings }}</p>
    </div>

  </div>
</template>