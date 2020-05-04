import { navigate } from "svelte-routing"
import { i18n } from "i18next"
import { Food, FoodId, isRecipe, Recipe } from "~/models/Food"
import { Recepto } from "~/models/Recepto"
import { onDefined } from "~/utils/values"
import receptoStore from "~/store/ReceptoStore"

export type RecipeIngredientInfo = {
  recipe: Recipe
  food: Food
}

export function getFood(recepto: Recepto, id: FoodId): Food | undefined {
  return recepto.foods.find(food => food.id === id)
}

export function getUsedFor(recepto: Recepto, id: FoodId): Array<RecipeIngredientInfo> {
  return recepto.foods
    .flatMap(food => {
      return food.sections
        .filter(isRecipe)
        .filter(recipe => recipe.ingredients.some(_ => _.id === id))
        .map(recipe => ({ recipe, food }))
    })
}

export function deleteFood(id: string | undefined, i18n: i18n): void {
  onDefined(id, id => {
    const confirmed = confirm(i18n.t("pages.food.page.actions.confirmDelete"))
    if (confirmed) {
      navigate(`/`)
      receptoStore.deleteFood(id)
    }
  })
}
