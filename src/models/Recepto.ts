import { Food } from "./Food"
import { Category } from "./Category"

export type Recepto = {
  categories: Array<Category>
  foods: Array<Food>
}