import { Recipe } from "../../models/Food"
import { Recepto } from "../../models/Recepto"
import { isDefined } from "../../utils/values"

type NormalizedRecipe = Omit<Recipe, "ingredients"> & {
  ingredients: Array<string>
}

export function normalizeRecipe(recepto: Recepto, recipe: Recipe): NormalizedRecipe {
  return {
    ...recipe,
    ingredients: recipe.ingredients
      .map(ingredient => recepto.foods.find(_ => _.id === ingredient.id))
      .filter(isDefined)
      .map(_ => _.name)
  }
}