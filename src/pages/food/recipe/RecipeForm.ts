import { Option } from "~/models/common"
import { Ingredient } from "~/models/Food"
import { Recepto } from "~/models/Recepto"
import { fillBy } from "~/utils/arrays"
import receptoStore from "~/store/ReceptoStore"

export const durations: Array<string> = fillBy(6 * 60 / 5 + 1, durationMinutes => {
  const hours = Math.floor(durationMinutes * 5 / 60)
  const minutes = durationMinutes * 5 % 60
  return `PT${hours}H${minutes}M`
})

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

export function addUnit(code: string, label: string): void {
  receptoStore.addUnit({ code, label })
}