import { Food, Replacement } from "../../../models/Food"
import { Recepto } from "../../../models/Recepto"
import { onDefined } from "../../../utils/values"

type FullReplacement = Omit<Replacement, "food"> & {
  food: Food
}

export function buildReplacement(recepto: Recepto, replacement: Replacement): FullReplacement | undefined {
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