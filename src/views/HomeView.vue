<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Recipe } from '@/types/Recipe'

const recipes = ref<Recipe[]>([])

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/recipes')
  const data = await response.json()
  recipes.value = data.recipes
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Recipe Book</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        class="bg-white shadow rounded p-4"
      >
        <img :src="recipe.image" class="w-full h-40 object-cover rounded" />
        <h2 class="text-lg font-semibold mt-2">{{ recipe.name }}</h2>
        <p class="text-gray-600">Cuisine: {{ recipe.cuisine }}</p>
      </div>
    </div>
  </div>
</template>