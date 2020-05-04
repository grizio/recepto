import { Recepto } from "~/models/Recepto"
import { Food, Ingredient, Recipe } from "~/models/Food"
import { isDefined, onDefined } from "../../../utils/values"

export type FullIngredient = Omit<Ingredient, "id"> & {
  ref: Food
}

export function buildFullIngredients(recepto: Recepto, recipe: Recipe): Array<FullIngredient> {
  return recipe.ingredients
    .map(ingredient => onDefined(
      recepto.foods.find(food => food.id === ingredient.id),
      ref => ({ ...ingredient, ref })
    ))
    .filter(isDefined)
}