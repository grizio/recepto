import { navigate } from "svelte-routing"
import receptoStore from "~/store/ReceptoStore"
import { canonicalize } from "~/utils/strings"
import { PrimaryInformation } from "~/pages/food/primaryInformation/PrimaryInformationForm"
import { CategoryId } from "~/models/Category"

export function buildPrimaryInformation(categoryId: CategoryId): PrimaryInformation {
  return {
    name: "",
    category: categoryId
  }
}

export function addFood(primaryInformation: PrimaryInformation): void {
  const id = canonicalize(primaryInformation.name)
  receptoStore.addFood({
    id,
    name: primaryInformation.name,
    category: primaryInformation.category,
    sections: []
  })
  navigate(`/category/${primaryInformation.category}/food/${id}`)
}