import { extractDurationValues } from "~/utils/durations"
import i18next from "i18next"
import { isDefined, onDefined } from "~/utils/values"

export default function format(value: any, format?: string, _lng?: string): string {
  switch (format) {
    case "shortDuration":
      return formatShortDuration(value)
    case "longDuration":
      return formatLongDuration(value)
    default:
      return value
  }
}

function formatShortDuration(value: string): string {
  const values = extractDurationValues(value)
  if (values !== undefined) {
    if (values.hours === undefined) {
      return i18next.t("common.duration.short.minutes", { count: values.minutes })
    } else if (values.minutes === undefined) {
      return i18next.t("common.duration.short.hours", { count: values.hours })
    } else {
      return i18next.t("common.duration.short.hoursAndMinutes", { hours: values.hours, minutes: values.minutes.toString().padStart(2, "0") })
    }
  } else {
    return value
  }
}

function formatLongDuration(value: string): string {
  const values = extractDurationValues(value)
  if (values !== undefined) {
    return [
      onDefined(values.years, count => i18next.t("common.duration.long.years", { count })),
      onDefined(values.months, count => i18next.t("common.duration.long.months", { count })),
      onDefined(values.weeks, count => i18next.t("common.duration.long.weeks", { count })),
      onDefined(values.days, count => i18next.t("common.duration.long.days", { count })),
      onDefined(values.hours, count => i18next.t("common.duration.long.hours", { count })),
      onDefined(values.minutes, count => i18next.t("common.duration.long.minutes", { count })),
      onDefined(values.seconds, count => i18next.t("common.duration.long.seconds", { count })),
    ]
      .filter(isDefined)
      .join(" ")
  } else {
    return value
  }
}
