const regexp = /^P((\d+)Y)?((\d+)M)?((\d+)W)?((\d+)D)?(T((\d+)H)?((\d+)M)?((\d+)S)?)?$/

export function isValidDuration(duration: string): boolean {
  return regexp.test(duration)
}

type DurationValues = {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export function extractDurationValues(duration: string): DurationValues | undefined {
  const extractedValues = regexp.exec(duration)
  if (extractedValues !== null) {
    return {
      years: securedParseFloat(extractedValues[2]),
      months: securedParseFloat(extractedValues[4]),
      weeks: securedParseFloat(extractedValues[6]),
      days: securedParseFloat(extractedValues[8]),
      hours: securedParseFloat(extractedValues[11]),
      minutes: securedParseFloat(extractedValues[13]),
      seconds: securedParseFloat(extractedValues[15]),
    }
  } else {
    return undefined
  }
}

function securedParseFloat(value: string | undefined | null): number | undefined {
  if (value !== undefined && value !== null) {
    const result = parseFloat(value)
    if (result === 0 || isNaN(result)) {
      return undefined
    } else {
      return result
    }
  } else {
    return undefined
  }
}