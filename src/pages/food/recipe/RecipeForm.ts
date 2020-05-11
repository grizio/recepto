import { Option } from "~/models/common"
import { Ingredient } from "~/models/Food"
import { Recepto } from "~/models/Recepto"

export function buildIngredient(ingredientOptions: Array<Option>, unitOptions: Array<Option>): Ingredient {
  return {
    id: ingredientOptions[0].value,
    quantity: 1,
    unit: unitOptions[0].value
  }
}

export function getUnitOptions(recepto: Recepto): Array<Option> {
  return recepto.units.map(unit => ({
    value: unit.code,
    label: unit.label
  }))
}