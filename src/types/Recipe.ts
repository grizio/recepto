export type Recipe = {
  name: string
  shortDescription?: string
  plates: number
  duration: number
  ingredients: Array<RecipeIngredient>
  steps: string
}

export type RecipeIngredient = {
  id: string
  quantity: number
  unit: string
}