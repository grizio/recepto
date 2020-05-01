import { Ingredient } from "./Ingredient"
import { Recipe } from "./Recipe"
import { Category } from "./Category"

export type Recepto = {
  categories: Array<Category>
  ingredients: Array<Ingredient>
  recipes: Array<Recipe>
}