import { i18n } from "i18next"
import { Recepto } from "~/models/Recepto"
import { NullableOption, Option } from "~/models/common"
import { sortBy } from "~/utils/arrays"
import { Food } from "~/models/Food"

export type NewFood = Omit<Food, "id">
export type FoodForm = NewFood | Food

export function getFoodOptions(recepto: Recepto, excludedFood: Food | undefined): Array<Option> {
  return sortBy(recepto.foods, _ => _.name)
    .filter(_ => excludedFood === undefined || _.id !== excludedFood.id)
    .map(recipe => ({ label: recipe.name, value: recipe.id }))
}

export function getCategoryOptions(recepto: Recepto, i18n: i18n): Array<NullableOption> {
  return [
    { label: i18n.t("pages.food.form.category.none"), value: undefined },

    ...sortBy(recepto.categories, _ => _.name)
      .map(recipe => ({ label: recipe.name, value: recipe.id }))
  ]
}
