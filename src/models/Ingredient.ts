export type IngredientId = string

export type Ingredient = {
  id: IngredientId
  name: string
  category?: string
  description: string
  preservations: Array<Preservation>
  preparations: Array<Preparation>
  recipes: Array<Recipe>
  replacements: Array<Replacement>
}

export type Preservation = {
  name: string
  duration: string
  description: string
}

export type Preparation = {
  name: string
  description: string
}

export type Replacement = {
  ingredient: IngredientId
  description: string
}

export type Recipe = {
  name: string
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