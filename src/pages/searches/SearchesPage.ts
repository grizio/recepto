import { Search } from "~/models/Search"
import receptoStore from "~/store/ReceptoStore"
import { Recepto } from "~/models/Recepto"

export function initializeSearches(recepto: Recepto): Array<Search> {
  return [...recepto.searches]
}

export function buildNewSearch(): Search {
  return {
    sitename: "",
    url: ""
  }
}

export function updateSearches(searches: Array<Search>): void {
  receptoStore.updateSearches(searches)
}