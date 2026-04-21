export interface Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string[]
  image: string
  cuisine: string
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  difficulty: string
  caloriesPerServing: number
  tags: string[]
  rating: number
}