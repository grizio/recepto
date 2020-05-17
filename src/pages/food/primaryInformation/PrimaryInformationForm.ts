import { Recepto } from "~/models/Recepto"
import { Option } from "~/models/common"
import { sortBy } from "~/utils/arrays"
import { CategoryId } from "~/models/Category"

export type PrimaryInformation = {
  name: string
  category: CategoryId
}

export function getCategoryOptions(recepto: Recepto): Array<Option> {
  return [
    ...sortBy(recepto.categories, _ => _.name)
      .map(recipe => ({ label: recipe.name, value: recipe.id }))
  ]
}
