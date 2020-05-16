import { navigate } from "svelte-routing"
import { i18n } from "i18next"

import { Recepto } from "~/models/Recepto"
import { Category } from "~/models/Category"
import receptoStore from "~/store/ReceptoStore"

export function findCategory(recepto: Recepto, id: string | undefined): Category | undefined {
  if (id !== undefined) {
    return recepto.categories.find(_ => _.id === id)
  } else {
    return undefined
  }
}

export function saveCategory(id: string, name: string): void {
  receptoStore.updateCategory({ id, name })
}

export function deleteCategory(id: string, i18n: i18n): void {
  const confirmed = confirm(i18n.t("pages.category.page.actions.confirmDelete"))
  if (confirmed) {
    navigate(`/`)
    receptoStore.deleteCategory(id)
  }
}