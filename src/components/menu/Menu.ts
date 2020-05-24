import { Recepto } from "~/models/Recepto"
import { CategoryId } from "~/models/Category"
import { sortBy } from "~/utils/arrays"
import { FoodId } from "~/models/Food"
import { Nullable, onDefined } from "~/utils/values"
import receptoStore from "~/store/ReceptoStore"
import { canonicalize } from "~/utils/strings"
import { navigate } from "svelte-routing"

export type MenuItem = {
  href: string
  label: string
  active: boolean
}

type ActiveRoute = {
  params: Nullable<Record<string, string>>
}

export function getActiveCategoryId(activeRoute: Nullable<ActiveRoute>): CategoryId | undefined {
  return onDefined(activeRoute, _ => onDefined(_.params, _ => _.categoryId))
}

export function getActiveFoodId(activeRoute: Nullable<ActiveRoute>): FoodId | undefined {
  return onDefined(activeRoute, _ => onDefined(_.params, _ => _.foodId))
}

export function getCategories(recepto: Recepto, activeCategoryId: CategoryId): Array<MenuItem> {
  return sortBy(recepto.categories, _ => _.name)
    .map(category => ({
      href: `/category/${category.id}`,
      label: category.name,
      active: category.id === activeCategoryId
    }))
}

export function getFoodsFromCategory(recepto: Recepto, activeCategoryId: CategoryId | undefined, activeFoodId: FoodId | undefined): Array<MenuItem> {
  if (activeCategoryId !== undefined) {
    return recepto.foods
      .filter(_ => _.category === activeCategoryId)
      .map(food => ({
        href: `/category/${activeCategoryId}/food/${food.id}`,
        label: food.name,
        active: food.id === activeFoodId
      }))
  } else {
    return []
  }
}

export function searchFoods(recepto: Recepto, search: string, activeFoodId: string | undefined): Array<MenuItem> {
  const normalizedSearch = search.toLocaleLowerCase()
  return recepto.foods
    .filter(_ => _.name.toLocaleLowerCase().includes(normalizedSearch))
    .map(food => ({
      href: `/category/${food.category}/food/${food.id}`,
      label: food.name,
      active: food.id === activeFoodId
    }))
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