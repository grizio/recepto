import i18next from "i18next"
import { readable } from "svelte/store"
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
      },
      interpolation: {
        format
      }
    }).then(() => {
    set(i18next)
  })
})
export default i18n

function format(value: any, format?: string, _lng?: string): string {
  switch (format) {
    case "shortDuration":
      return formatDuration(value)
    default:
      return value
  }
}

function formatDuration(value: any): string {
  const intValue = parseInt(value, 10)
  if (intValue < 60) {
    return i18next.t("common.duration.short.minutes", { count: intValue })
  } else {
    const hours = Math.floor(intValue / 60)
    const minutes = intValue % 60

    if (minutes !== 0) {
      return i18next.t("common.duration.short.hoursAndMinutes", { hours, minutes: minutes.toString().padStart(2, "0") })
    } else {
      return i18next.t("common.duration.short.hours", { count: hours })
    }
  }
}