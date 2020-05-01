import { i18n } from "i18next"
import { navigate } from "svelte-routing"

import { Ingredient, IngredientId, Replacement } from "../../models/Ingredient"
import { Recepto } from "../../models/Recepto"
import { Recipe } from "../../models/Recipe"
import { isDefined, onDefined } from "../../utils/values"
import receptoStore from "../../store/ReceptoStore"

export type FullIngredient = Omit<Ingredient, "replacements" | "recipes"> & {
  replacements: Array<FullReplacement>
  recipes: Array<Recipe>
  recipesDIY: Array<Recipe>
}

type FullReplacement = Omit<Replacement, "ingredient"> & {
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
      recipes: recepto.recipes.filter(recipe => recipe.ingredients.some(_ => _.id === id)),
      recipesDIY: ingredient.recipes
        .map(recipe => recepto.recipes.find(_ => _.id === recipe))
        .filter(isDefined)
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