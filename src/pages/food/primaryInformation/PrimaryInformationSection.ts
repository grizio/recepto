import { Recepto } from "~/models/Recepto"
import { Category } from "~/models/Category"

export function getCategory(recepto: Recepto, id: string | undefined): Category | undefined {
  if (id !== undefined) {
    return recepto.categories.find(_ => _.id === id)
  } else {
    return undefined
  }
}