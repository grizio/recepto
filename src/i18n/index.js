import { readable } from "svelte/store"
import i18next from "i18next"
import LanguageDetector from 'i18next-browser-languagedetector'

import en from "./en.json"
import fr from "./fr.json"

const i18n = readable(i18next, (set) => {
  i18next
    .use(LanguageDetector)
    .init({
      fallbackLng: "en",
      resources: {
        en, fr
      }
    }).then(() => {
    set(i18next)
  })
})
export default i18n
