import receptoStore from "~/store/ReceptoStore"
import { Recepto } from "~/models/Recepto"
import { Unit } from "~/models/Unit"

export function initializeUnits(recepto: Recepto): Array<Unit> {
  return [...recepto.units]
}

export function buildNewUnit(): Unit {
  return {
    code: "",
    label: ""
  }
}

export function updateUnits(units: Array<Unit>): void {
  receptoStore.updateUnits(units)
}