import { Category } from "../../models/Category"
import { canonicalize } from "../../utils/strings"
import receptoStore from "../../store/ReceptoStore"
import { Recepto } from "../../models/Recepto"

type NewCategory = Omit<Category, "id">
type CategoryItem = NewCategory | Category

function isNewCategory(category: CategoryItem): category is NewCategory {
  return (category as Category).id === undefined
}

export function initializeCategories(recepto: Recepto): Array<CategoryItem> {
  return [...recepto.categories]
}

export function buildNewCategory(): NewCategory {
  return {
    name: ""
  }
}

export function updateCategories(categories: Array<CategoryItem>): void {
  const categoriesToSave = categories.map(category => {
    if (isNewCategory(category)) {
      return {
        ...category,
        id: canonicalize(category.name)
      }
    } else {
      return category
    }
  })
  receptoStore.updateCategories(categoriesToSave)
}