import receptoStore from "~/store/ReceptoStore"
import { i18n } from "i18next"

export function addSearch(sitename: string, url: string): void {
  receptoStore.addSearch({ sitename, url })
}

export function removeSearch(index: number, i18n: i18n): void {
  const confirmed = confirm(i18n.t("pages.food.searches.confirmRemove"))
  if (confirmed) {
    receptoStore.removeSearch(index)
  }
}