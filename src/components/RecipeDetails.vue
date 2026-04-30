<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Recipe } from '@/types/Recipe'

const route = useRoute()
const router = useRouter()
const recipe = ref<Recipe | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

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
  <div class="max-w-3xl mx-auto p-6">
    <button
      @click="router.back()"
      class="mb-4 text-sm text-blue-500 hover:underline"
    >
      ← Back
    </button>

    <div v-if="loading" class="text-center py-10 text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>

    <div v-else-if="recipe">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 class="text-3xl font-bold mb-2">{{ recipe.name }}</h1>

      <div class="flex gap-4 text-sm text-gray-500 mb-6">
        <span>⏱ Prep: {{ recipe.prepTimeMinutes }} min</span>
        <span>🍳 Cook: {{ recipe.cookTimeMinutes }} min</span>
        <span>👥 Servings: {{ recipe.servings }}</span>
        <span>⭐ {{ recipe.rating }}</span>
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
</template>