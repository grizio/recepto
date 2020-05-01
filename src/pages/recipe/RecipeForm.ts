import { sortBy } from "../../utils/arrays"
import { Recipe, RecipeIngredient } from "../../models/Recipe"
import { Recepto } from "../../models/Recepto"
import { Option } from "../../models/common"

export type NewRecipe = Omit<Recipe, "id">
export type RecipeForm = NewRecipe | Recipe

export function buildIngredientOptions(recepto: Recepto): Array<Option> {
  return sortBy(recepto.ingredients, _ => _.name)
    .map(ingredient => ({ value: ingredient.id, label: ingredient.name }))
}

export function buildRecipeIngredient(ingredientOptions: Array<Option>): RecipeIngredient {
  return {
    id: ingredientOptions[0].value,
    quantity: 1,
    unit: ""
  }
}
