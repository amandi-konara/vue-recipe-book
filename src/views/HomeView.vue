<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Recipe } from '@/types/Recipe'
import RecipeCard from '@/components/RecipeCard.vue'
import { fetchRecipes } from '@/api/recipes'

const recipes = ref<Recipe[]>([])
const searchQuery = ref('')
const selectedCuisine = ref('')

onMounted(async () => {
  recipes.value = await fetchRecipes()
})

const cuisines = computed(() => {
  const all = recipes.value.map(r => r.cuisine)
  return [...new Set(all)]
})

const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    const matchesCuisine =
      selectedCuisine.value === '' ||
      selectedCuisine.value === 'All' ||
      recipe.cuisine === selectedCuisine.value

    return matchesSearch && matchesCuisine
  })
})
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-800 min-h-screen px-8 py-8">

    <!-- Search and Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes..."
        class="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      />
      <select
        v-model="selectedCuisine"
        class="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      >
        <option value="" disabled>All Cuisines</option>
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
          {{ cuisine }}
        </option>
      </select>
    </div>

    <!-- No results message -->
    <p v-if="filteredRecipes.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-10">
      No recipes found. Try a different search!
    </p>

    <!-- Recipe Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>

  </div>
</template>