import { i18n } from "i18next"
import { navigate } from "svelte-routing"
import { Recipe, RecipeId, RecipeIngredient } from "../../models/Recipe"
import { Ingredient } from "../../models/Ingredient"
import { Recepto } from "../../models/Recepto"
import { isDefined, onDefined } from "../../utils/values"
import receptoStore from "../../store/ReceptoStore"

export type FullRecipe = Omit<Recipe, "ingredients"> & {
  ingredients: Array<FullRecipeIngredient>
}

export type FullRecipeIngredient = Omit<RecipeIngredient, "id"> & {
  ref: Ingredient
}

export function findFullRecipe(recepto: Recepto, id: RecipeId | undefined): FullRecipe | undefined {
  const recipe = onDefined(id, id => recepto.recipes.find(recipe => recipe.id === id))
  if (recipe !== undefined) {
    return {
      ...recipe,
      ingredients: buildFullRecipeIngredients(recepto, recipe)
    }
  } else {
    return undefined
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

export function deleteRecipe(id: RecipeId, i18n: i18n) {
  const confirmed = confirm(i18n.t("pages.recipe.page.actions.confirmDelete"))
  if (confirmed) {
    navigate(`/`)
    receptoStore.deleteRecipe(id)
  }
}