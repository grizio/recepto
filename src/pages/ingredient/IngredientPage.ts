import { i18n } from "i18next"
import { navigate } from "svelte-routing"
import receptoStore from "../../store/ReceptoStore"

import { Ingredient, IngredientId, Replacement, Recipe, RecipeIngredient } from "../../models/Ingredient"
import { Recepto } from "../../models/Recepto"
import { isDefined, onDefined } from "../../utils/values"

export type FullIngredient = Omit<Ingredient, "replacements" | "recipes"> & {
  replacements: Array<FullReplacement>
  recipes: Array<FullRecipe>
  usedFor: Array<RecipeIngredientInfo>
}

type FullReplacement = Omit<Replacement, "ingredient"> & {
  ingredient: Ingredient
}

export type FullRecipe = Omit<Recipe, "ingredients"> & {
  ingredients: Array<FullRecipeIngredient>
}

export type FullRecipeIngredient = Omit<RecipeIngredient, "id"> & {
  ref: Ingredient
}

export type RecipeIngredientInfo = {
  recipe: Recipe
  ingredient: Ingredient
}

export function buildFullIngredient(recepto: Recepto, id: IngredientId | undefined): FullIngredient | undefined {
  const ingredient = onDefined(id, id => recepto.ingredients.find(_ => _.id === id))
  if (ingredient !== undefined) {
    return {
      ...ingredient,
      replacements: ingredient.replacements
        .map(r => buildReplacement(recepto, r))
        .filter(isDefined),
      recipes: ingredient.recipes.map(recipe => buildFullRecipe(recepto, recipe)),
      usedFor: recepto.ingredients
        .flatMap(ingredient => {
          return ingredient.recipes
            .filter(recipe => recipe.ingredients.some(_ => _.id === id))
            .map(recipe => ({ recipe, ingredient }))
        })
    }
  } else {
    return undefined
  }
}

function buildReplacement(recepto: Recepto, replacement: Replacement): FullReplacement | undefined {
  return onDefined(
    recepto.ingredients.find(ingredient => ingredient.id === replacement.ingredient),
    (ingredient) => {
      return {
        ...replacement,
        ingredient
      }
    }
  )
}

export function deleteIngredient(id: string | undefined, i18n: i18n): void {
  onDefined(id, id => {
    const confirmed = confirm(i18n.t("pages.ingredient.page.actions.confirmDelete"))
    if (confirmed) {
      navigate(`/`)
      receptoStore.deleteIngredient(id)
    }
  })
}

export function buildFullRecipe(recepto: Recepto, recipe: Recipe): FullRecipe {
  return {
    ...recipe,
    ingredients: buildFullRecipeIngredients(recepto, recipe)
  }
}

function buildFullRecipeIngredients(recepto: Recepto, recipe: Recipe): Array<FullRecipeIngredient> {
  return recipe.ingredients
    .map(recipeIngredient => onDefined(
      recepto.ingredients.find(ingredient => ingredient.id === recipeIngredient.id),
      ref => ({ ...recipeIngredient, ref })
    ))
    .filter(isDefined)
}