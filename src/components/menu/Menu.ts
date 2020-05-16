import { Recepto } from "~/models/Recepto"
import { Category } from "~/models/Category"
import { sortBy } from "~/utils/arrays"
import { Food } from "~/models/Food"

export function getCategories(recepto: Recepto): Array<Category> {
  return sortBy(recepto.categories, _ => _.name)
}

export function getFoodsFromCategory(recepto: Recepto, activeCategory: Category | undefined): Array<Food> {
  if (activeCategory !== undefined) {
    return recepto.foods.filter(_ => _.category === activeCategory.id)
  } else {
    return []
  }
}