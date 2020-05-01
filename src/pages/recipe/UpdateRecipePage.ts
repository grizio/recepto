import { navigate } from "svelte-routing"
import receptoStore from "../../store/ReceptoStore"
import { Recipe, RecipeId } from "../../models/Recipe"
import { Recepto } from "../../models/Recepto"
import { onDefined } from "../../utils/values"

export function findRecipe(recepto: Recepto, id: RecipeId | undefined): Recipe | undefined {
  return onDefined(id, id => recepto.recipes.find(recipe => recipe.id === id))
}

export function updateRecipe(recipe: Recipe) {
  navigate(`/recipe/${recipe.id}`)
  receptoStore.updateRecipe(recipe)
}