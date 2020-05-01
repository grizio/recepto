import { navigate } from "svelte-routing"
import receptoStore from "../../store/ReceptoStore"
import { canonicalize } from "../../utils/strings"
import { NewIngredient } from "./ingredientForm"

export function buildNewIngredient(): NewIngredient {
  return {
    name: "",
    description: "",
    preservations: [],
    preparations: [],
    replacements: [],
    recipes: []
  }
}

export function addIngredient(ingredient: NewIngredient): void {
  const id = canonicalize(ingredient.name)
  receptoStore.addIngredient({ ...ingredient, id })
  navigate(`/ingredient/${id}`)
}