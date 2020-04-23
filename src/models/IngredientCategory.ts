import { i18n } from "i18next"
import { Ingredient } from "./Ingredient"
import { Recepto } from "./Recepto"
import { nonEmpty, sortBy } from "../utils/arrays"

export type IngredientCategory = {
  id: string
  name: string
}

export type FullIngredientCategory = IngredientCategory & {
  ingredients: Array<Ingredient>
}

export function getIngredientsByCategory(recepto: Recepto, i18n: i18n): Array<FullIngredientCategory> {
  const fullCategories = sortBy(recepto.ingredientCategories, _ => _.name)
    .map(category => ({
      ...category,
      ingredients: sortBy(
        recepto.ingredients.filter(_ => _.category === category.id),
        _ => _.name
      )
    }))
    .filter(_ => nonEmpty(_.ingredients))

  const remainingIngredients = recepto.ingredients.filter(_ => _.category === undefined)
  if (nonEmpty(remainingIngredients)) {
    return [
      ...fullCategories,
      {
        id: "#",
        name: i18n.t("menu.otherCategoryName"),
        ingredients: remainingIngredients
      }
    ]
  } else {
    return fullCategories
  }
}