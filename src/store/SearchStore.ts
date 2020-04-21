import { readable } from "svelte/store"

type Search = {
  sitename: string,
  url: (s: string) => string
}

const searches = readable<Array<Search>>(
  [
    { sitename: "Marmiton", url: (s) => `https://www.marmiton.org/recettes/recherche.aspx?aqt=${s}` },
    { sitename: "750g", url: (s) => `https://www.750g.com/recherche.htm?search=${s}` },
    { sitename: "Cuisine actuelle", url: (s) => `https://www.cuisineactuelle.fr/content/search?search[keyword]=${s}` },
    { sitename: "Les foodies", url: (s) => `http://www.lesfoodies.com/recettes/${s}` },
    { sitename: "Cuisine AZ", url: (s) => `https://www.cuisineaz.com/recettes/recherche_terme.aspx?recherche=${s}` },
    { sitename: "Journal des femmes", url: (s) => `https://cuisine.journaldesfemmes.fr/s/?f_libelle=${s}` },
    { sitename: "Recette.de", url: (s) => `https://recettes.de/${s}` },
  ],
  () => {
    //do nothing
  }
)
export default searches