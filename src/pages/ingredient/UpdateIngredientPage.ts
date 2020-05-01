import { navigate } from "svelte-routing"
import receptoStore from "../../store/ReceptoStore"
import { Recepto } from "../../models/Recepto"
import { Ingredient, IngredientId } from "../../models/Ingredient"

export function getIngredient(recepto: Recepto, id: IngredientId): Ingredient | undefined {
  return recepto.ingredients.find(ingredient => ingredient.id === id)
}

export function updateIngredient(ingredient: Ingredient): void {
  receptoStore.updateIngredient(ingredient)
  navigate(`/ingredient/${ingredient.id}`)
}