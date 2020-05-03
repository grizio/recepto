import { navigate } from "svelte-routing"
import receptoStore from "~/store/ReceptoStore"
import { Recepto } from "~/models/Recepto"
import { Food, FoodId } from "~/models/Food"

export function getFood(recepto: Recepto, id: FoodId): Food | undefined {
  return recepto.foods.find(food => food.id === id)
}

export function updateFood(food: Food): void {
  receptoStore.updateFood(food)
  navigate(`/food/${food.id}`)
}