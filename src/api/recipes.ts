// This is the web address we fetch recipes from
const BASE_URL = 'https://dummyjson.com/recipes'

// This function goes to the internet and gets a list of recipes
export async function fetchRecipes() {
  // "fetch" is a built-in browser tool that loads data from a URL
  const response = await fetch(BASE_URL)

  // This converts the raw internet response into usable JavaScript data
  const data = await response.json()

  // dummyjson wraps recipes inside a "recipes" key, so we pull that out
  return data.recipes
}

// This function fetches just ONE recipe by its ID number
export async function fetchRecipeById(id: number) {
  const response = await fetch(`${BASE_URL}/${id}`)
  const data = await response.json()
  return data
}