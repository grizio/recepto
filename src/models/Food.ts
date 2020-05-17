import { CategoryId } from "~/models/Category"

export type FoodId = string

export type Food = {
  id: FoodId
  name: string
  category: CategoryId
  sections: Array<Section>
}

export type Section =
  | Preservation
  | Preparation
  | Recipe
  | Replacement
  | Description

export type SectionType = Section["type"]

export type Preservation = {
  type: "preservation"
  name: string
  duration: string
  description: string
}

export type Preparation = {
  type: "preparation"
  name: string
  description: string
}

export type Replacement = {
  type: "replacement"
  food: FoodId
  description: string
}

export type Recipe = {
  type: "recipe"
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

export type Description = {
  type: "description"
  content: string
}

export function isRecipe(section: Section): section is Recipe {
  return section.type === "recipe"
}