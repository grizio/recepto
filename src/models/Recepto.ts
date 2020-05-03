import { Ingredient } from "./Ingredient"
import { Category } from "./Category"

export type Recepto = {
  categories: Array<Category>
  ingredients: Array<Ingredient>
}