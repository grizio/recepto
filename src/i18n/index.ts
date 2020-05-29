import i18next, { TFunction } from "i18next"
import { Readable, writable, Writable } from "svelte/store"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./en.json"
import fr from "./fr.json"
import format from "./format"

type AcceptedLanguage = "en" | "fr"
type I18n = {
  t: TFunction
  language: AcceptedLanguage
}

class I18nStore implements Readable<I18n> {
  private internal: Writable<I18n>

  constructor() {
    this.internal = writable(buildI18n())
    i18next
      .use(LanguageDetector)
      .init({
        fallbackLng: "en",
        resources: {
          en, fr
        },
        interpolation: {
          format
        }
      })
      .then(() => this.internal.set(buildI18n()))
  }

  subscribe: Readable<I18n>["subscribe"] = (run, invalidate) => {
    return this.internal.subscribe(run, invalidate)
  }

  changeLanguage = (language: AcceptedLanguage) => {
    i18next.changeLanguage(language)
      .then(() => this.internal.set(buildI18n()))
  }
}

function buildI18n(): I18n {
  return {
    // @ts-ignore
    t: (...args) => i18next.t(...args),
    language: i18next.language as AcceptedLanguage
  }
}

const i18n = new I18nStore()
export default i18n
