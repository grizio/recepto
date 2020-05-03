export type FoodId = string

export type Food = {
  id: FoodId
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
  food: FoodId
  description: string
}

export type Recipe = {
  name: string
  plates: number
  duration: number
  ingredients: Array<Ingredient>
  steps: string
}

export type Ingredient = {
  id: FoodId
  quantity: number
  unit: string
}