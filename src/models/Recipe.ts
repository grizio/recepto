import { IngredientId } from "./Ingredient"

export type RecipeId = string

export type Recipe = {
  id: RecipeId
  name: string
  shortDescription?: string
  plates: number
  duration: number
  ingredients: Array<RecipeIngredient>
  steps: string
}

export type RecipeIngredient = {
  id: IngredientId
  quantity: number
  unit: string
}