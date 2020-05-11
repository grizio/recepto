import { navigate } from "svelte-routing"
import receptoStore from "~/store/ReceptoStore"
import { canonicalize } from "~/utils/strings"
import { PrimaryInformation } from "~/pages/food/primaryInformation/PrimaryInformationForm"

export function buildPrimaryInformation(): PrimaryInformation {
  return {
    name: "",
    category: undefined
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
  navigate(`/food/${id}`)
}