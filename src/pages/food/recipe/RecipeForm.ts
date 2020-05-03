import { Option } from "~/models/common"
import { Ingredient } from "~/models/Food"

export function buildIngredient(ingredientOptions: Array<Option>): Ingredient {
  return {
    id: ingredientOptions[0].value,
    quantity: 1,
    unit: ""
  }
}