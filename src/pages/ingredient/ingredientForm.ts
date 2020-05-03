import { i18n } from "i18next"
import { Recepto } from "../../models/Recepto"
import { NullableOption, Option } from "../../models/common"
import { sortBy } from "../../utils/arrays"
import { Ingredient, Preparation, Preservation, Recipe, RecipeIngredient, Replacement } from "../../models/Ingredient"

export type NewIngredient = Omit<Ingredient, "id">
export type IngredientForm = NewIngredient | Ingredient

export function getRecipeOptions(recepto: Recepto): Array<Option> {
  return sortBy(recepto.recipes, _ => _.name)
    .map(recipe => ({ label: recipe.name, value: recipe.id }))
}

export function getIngredientOptions(recepto: Recepto, excludedIngredient: Ingredient | undefined): Array<Option> {
  return sortBy(recepto.ingredients, _ => _.name)
    .filter(_ => excludedIngredient === undefined || _.id !== excludedIngredient.id)
    .map(recipe => ({ label: recipe.name, value: recipe.id }))
}

export function getCategoryOptions(recepto: Recepto, i18n: i18n): Array<NullableOption> {
  return [
    { label: i18n.t("pages.ingredient.form.category.none"), value: undefined },

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

export function buildReplacement(ingredientOptions: Array<Option>): Replacement {
  const firstIngredient = ingredientOptions.find(_ => _.value !== undefined)
  return {
    // How to make it more robust?
    ingredient: firstIngredient?.value ?? "",
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

export function buildRecipeIngredient(ingredientOptions: Array<Option>): RecipeIngredient {
  return {
    id: ingredientOptions[0].value,
    quantity: 1,
    unit: ""
  }
}
