import { i18n } from "i18next"
import { Recepto } from "~/models/Recepto"
import { NullableOption } from "~/models/common"
import { sortBy } from "~/utils/arrays"

export type PrimaryInformation = {
  name: string
  category?: string
}

export function getCategoryOptions(recepto: Recepto, i18n: i18n): Array<NullableOption> {
  return [
    { label: i18n.t("pages.food.form.category.none"), value: undefined },

    ...sortBy(recepto.categories, _ => _.name)
      .map(recipe => ({ label: recipe.name, value: recipe.id }))
  ]
}
