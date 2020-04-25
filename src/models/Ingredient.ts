import { Recipe } from "./Recipe"

export type Ingredient = {
  id: string
  name: string
  category?: string
  description: string
  preservations: Array<Preservation>
  preparations: Array<Preparation>
  recipesToMakeIt: Array<Recipe>
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