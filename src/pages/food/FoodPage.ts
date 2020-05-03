import { i18n } from "i18next"
import { navigate } from "svelte-routing"
import receptoStore from "../../store/ReceptoStore"

import { Food, FoodId, Replacement, Recipe, Ingredient } from "../../models/Food"
import { Recepto } from "../../models/Recepto"
import { isDefined, onDefined } from "../../utils/values"

export type FullFood = Omit<Food, "replacements" | "recipes"> & {
  replacements: Array<FullReplacement>
  recipes: Array<FullRecipe>
  usedFor: Array<RecipeIngredientInfo>
}

type FullReplacement = Omit<Replacement, "food"> & {
  food: Food
}

export type FullRecipe = Omit<Recipe, "ingredients"> & {
  ingredients: Array<FullIngredient>
}

export type FullIngredient = Omit<Ingredient, "id"> & {
  ref: Food
}

export type RecipeIngredientInfo = {
  recipe: Recipe
  food: Food
}

export function buildFullFood(recepto: Recepto, id: FoodId | undefined): FullFood | undefined {
  const ingredient = onDefined(id, id => recepto.foods.find(_ => _.id === id))
  if (ingredient !== undefined) {
    return {
      ...ingredient,
      replacements: ingredient.replacements
        .map(r => buildReplacement(recepto, r))
        .filter(isDefined),
      recipes: ingredient.recipes.map(recipe => buildFullRecipe(recepto, recipe)),
      usedFor: recepto.foods
        .flatMap(food => {
          return food.recipes
            .filter(recipe => recipe.ingredients.some(_ => _.id === id))
            .map(recipe => ({ recipe, food }))
        })
    }
  } else {
    return undefined
  }
}

function buildReplacement(recepto: Recepto, replacement: Replacement): FullReplacement | undefined {
  return onDefined(
    recepto.foods.find(food => food.id === replacement.food),
    (food) => {
      return {
        ...replacement,
        food
      }
    }
  )
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

export function buildFullRecipe(recepto: Recepto, recipe: Recipe): FullRecipe {
  return {
    ...recipe,
    ingredients: buildFullIngredients(recepto, recipe)
  }
}

function buildFullIngredients(recepto: Recepto, recipe: Recipe): Array<FullIngredient> {
  return recipe.ingredients
    .map(ingredient => onDefined(
      recepto.foods.find(food => food.id === ingredient.id),
      ref => ({ ...ingredient, ref })
    ))
    .filter(isDefined)
}