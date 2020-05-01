import { navigate } from "svelte-routing"
import receptoStore from "../../store/ReceptoStore"
import { canonicalize } from "../../utils/strings"
import { NewRecipe } from "./RecipeForm"

export function buildNewRecipe(): NewRecipe {
  return {
    name: "",
    plates: 1,
    duration: 0,
    ingredients: [],
    steps: ""
  }
}

export function createRecipe(recipe: NewRecipe) {
  const id = canonicalize(recipe.name)
  receptoStore.addRecipe({ ...recipe, id })
  navigate(`/recipe/${id}`)
}