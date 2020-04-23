import { Recipe } from "./Recipe"

export type Ingredient = {
  id: string
  name: string
  category?: string
  description: string
  preservations: Array<Preservation>
  recipesToMakeIt: Array<Recipe>
}

export type Preservation = {
  name: string
  duration: string
  description: string
}