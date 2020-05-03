import { i18n } from "i18next"
import { Food } from "./Food"
import { Recepto } from "./Recepto"
import { nonEmpty, sortBy } from "../utils/arrays"

export type Category = {
  id: string
  name: string
}

export type FullCategory = Category & {
  foods: Array<Food>
}

export function getIngredientsByCategory(recepto: Recepto, i18n: i18n): Array<FullCategory> {
  const fullCategories = sortBy(recepto.categories, _ => _.name)
    .map(category => ({
      ...category,
      foods: sortBy(
        recepto.foods.filter(_ => _.category === category.id),
        _ => _.name
      )
    }))
    .filter(_ => nonEmpty(_.foods))

  const remainingFoods = recepto.foods.filter(_ => _.category === undefined)
  if (nonEmpty(remainingFoods)) {
    return [
      ...fullCategories,
      {
        id: "#",
        name: i18n.t("menu.otherCategoryName"),
        foods: remainingFoods
      }
    ]
  } else {
    return fullCategories
  }
}