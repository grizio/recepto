export type Recipe = {
  name: string
  shortDescription?: string
  plates: number
  preparationDuration: number
  cookingDuration: number
  ingredients: Array<RecipeIngredient>
  steps: string
}

export type RecipeIngredient = {
  id: string
  quantity: number
  unit: string
}