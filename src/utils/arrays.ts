export function replaceWhere<T>(array: Array<T>, where: (value: T) => boolean, by: (value: T) => T): Array<T> {
  return array.map(value => {
    if (where(value)) {
      return by(value)
    } else {
      return value
    }
  })
}

export function sortBy<T>(array: Array<T>, by: (value: T) => string | number): Array<T> {
  return array.sort((item1, item2) => {
    const by1 = by(item1)
    const by2 = by(item2)
    if (by1 < by2) {
      return -1
    } else if (by1 > by2) {
      return 1
    } else {
      return 0
    }
  })
}

export function removeAt<T>(array: Array<T>, at: number): Array<T> {
  const result = [...array]
  result.splice(at, 1)
  return result
}

export function nonEmpty<T>(array: Array<T> | undefined): boolean {
  return array !== undefined && array !== null && array.length > 0
}