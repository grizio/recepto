import { navigate } from "svelte-routing"
import receptoStore from "~/store/ReceptoStore"
import { canonicalize } from "~/utils/strings"
import { NewFood } from "./FoodForm"

export function buildNewFood(): NewFood {
  return {
    name: "",
    description: "",
    preservations: [],
    preparations: [],
    replacements: [],
    recipes: []
  }
}

export function addFood(food: NewFood): void {
  const id = canonicalize(food.name)
  receptoStore.addFood({ ...food, id })
  navigate(`/food/${id}`)
}