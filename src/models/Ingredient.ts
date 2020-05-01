import { RecipeId } from "./Recipe"

export type IngredientId = string

export type Ingredient = {
  id: IngredientId
  name: string
  category?: string
  description: string
  preservations: Array<Preservation>
  preparations: Array<Preparation>
  recipes: Array<RecipeId>
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