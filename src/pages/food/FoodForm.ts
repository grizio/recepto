import { i18n } from "i18next"
import { Recepto } from "~/models/Recepto"
import { NullableOption, Option } from "~/models/common"
import { sortBy } from "~/utils/arrays"
import { Food, Preparation, Preservation, Recipe, Ingredient, Replacement } from "~/models/Food"

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

export function buildPreservation(): Preservation {
  return {
    name: "",
    duration: "",
    description: ""
  }
}

export function buildPreparation(): Preparation {
  return {
    name: "",
    description: ""
  }
}

export function buildReplacement(foodOptions: Array<Option>): Replacement {
  return {
    food: foodOptions[0].value,
    description: ""
  }
}

export function buildRecipe(): Recipe {
  return {
    name: "",
    plates: 1,
    duration: 0,
    ingredients: [],
    steps: ""
  }
}

export function buildIngredient(ingredientOptions: Array<Option>): Ingredient {
  return {
    id: ingredientOptions[0].value,
    quantity: 1,
    unit: ""
  }
}
