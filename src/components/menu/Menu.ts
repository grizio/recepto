import { Recepto } from "~/models/Recepto"
import { Category, CategoryId } from "~/models/Category"
import { sortBy } from "~/utils/arrays"
import { Food, FoodId } from "~/models/Food"
import { Nullable, onDefined } from "~/utils/values"
import receptoStore from "~/store/ReceptoStore"
import { canonicalize } from "~/utils/strings"
import { navigate } from "svelte-routing"

type ActiveRoute = {
  params: Nullable<Record<string, string>>
}

export function getActiveCategoryId(activeRoute: Nullable<ActiveRoute>): CategoryId | undefined {
  return onDefined(activeRoute, _ => onDefined(_.params, _ => _.categoryId))
}

export function getActiveFoodId(activeRoute: Nullable<ActiveRoute>): FoodId | undefined {
  return onDefined(activeRoute, _ => onDefined(_.params, _ => _.foodId))
}

export function getCategories(recepto: Recepto): Array<Category> {
  return sortBy(recepto.categories, _ => _.name)
}

export function getFoodsFromCategory(recepto: Recepto, activeCategoryId: CategoryId | undefined): Array<Food> {
  if (activeCategoryId !== undefined) {
    return recepto.foods.filter(_ => _.category === activeCategoryId)
  } else {
    return []
  }
}

export function addCategory(name: string): void {
  const id = canonicalize(name)
  receptoStore.addCategory({ id, name })
  navigate(`/category/${id}`)
}

export function addFood(categoryId: CategoryId, name: string): void {
  const id = canonicalize(name)
  receptoStore.addFood({
    id: id,
    name: name,
    category: categoryId,
    sections: []
  })
  navigate(`/category/${categoryId}/food/${id}`)
}