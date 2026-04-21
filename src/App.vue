<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {ref , computed, onMounted} from 'vue'
import RecipeCard from './components/RecipeCard.vue'
import type{ Recipe } from './types/Recipe'

const recipes = ref<Recipe[]>([])

onMounted(async () => {
  const response = await fetch('/api/recipes')
  const data = await response.json()
  recipes.value = await data as Recipe[]
})

// --- NEW: Search and Filter ---

// This holds whatever the user types in the search box
const searchQuery = ref('')

// This holds the selected cuisine from the dropdown
const selectedCuisine = ref('')

// This builds a list of unique cuisines from your recipes
// so the dropdown options are generated automatically
const cuisines = computed(() => {
  const all = recipes.value.map(r => r.cuisine) // get all cuisine values
  return ['All', ...new Set(all)] // remove duplicates, add 'All' at the start
})

// This is the filtered list of recipes
// It updates automatically whenever search or cuisine changes
const filteredRecipes = computed(() => {
  return recipes.value.filter(recipe => {

    // Check if recipe name includes what the user typed
    // toLowerCase() makes it case-insensitive
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())

    // Check if cuisine matches the selected dropdown value
    // If 'All' is selected, show every recipe
    const matchesCuisine =
      selectedCuisine.value === '' ||
      selectedCuisine.value === 'All' ||
      recipe.cuisine === selectedCuisine.value

    // Only show recipe if BOTH conditions are true
    return matchesSearch && matchesCuisine
  })
})
</script>

<template>
  <RouterView />
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- Page Title -->
    <h1 class="text-3xl font-bold text-center mb-6">Recipe Book</h1>

    <!-- Search and Filter Bar -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">

      <!-- Search Input -->
      <!-- v-model links this input to searchQuery -->
      <!-- so when user types, searchQuery updates automatically -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search recipes..."
        class="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <!-- Cuisine Dropdown -->
      <!-- v-model links this to selectedCuisine -->
      <select
        v-model="selectedCuisine"
        class="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <!-- Loop through the cuisines list to create each option -->
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
          {{ cuisine }}
        </option>
      </select>

    </div>

    <!-- Show message if no recipes match -->
    <p v-if="filteredRecipes.length === 0" class="text-center text-gray-500">
      No recipes found. Try a different search!
    </p>

    <!-- Recipe Grid -->
    <!-- Loop through filteredRecipes (not all recipes) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </div>

  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
