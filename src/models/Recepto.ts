import { Category } from "./Category"
import { Food } from "./Food"
import { Search } from "./Search"

export type Recepto = {
  categories: Array<Category>
  foods: Array<Food>
  searches: Array<Search>
}

export function buildInitialReceptoValue(): Recepto {
  return {
    categories: [],
    foods: [],
    searches: [
      { sitename: "Marmiton", url: "https://www.marmiton.org/recettes/recherche.aspx?aqt={s}" },
      { sitename: "750g", url: "https://www.750g.com/recherche.htm?search={s}" },
      { sitename: "Cuisine actuelle", url: "https://www.cuisineactuelle.fr/content/search?search[keyword]={s}" },
      { sitename: "Les foodies", url: "http://www.lesfoodies.com/recettes/{s}" },
      { sitename: "Cuisine AZ", url: "https://www.cuisineaz.com/recettes/recherche_terme.aspx?recherche={s}" },
      { sitename: "Journal des femmes", url: "https://cuisine.journaldesfemmes.fr/s/?f_libelle={s}" },
      { sitename: "Recette.de", url: "https://recettes.de/{s}" },
    ]
  }
}