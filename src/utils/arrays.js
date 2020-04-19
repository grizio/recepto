/**
 * @template T
 * @param {Array<T>} array
 * @param {function(value: T): boolean} where
 * @param {function(value: T): T} by
 * @return {Array<T>}
 */
export function replaceWhere(array, where, by) {
  return array.map(value => {
    if (where(value)) {
      return by(value)
    } else {
      return value
    }
  })
}

/**
 * @template T
 * @param {Array<T>} array
 * @param {function(value: T): string | number} by
 * @return Array<T>
 */
export function sortBy(array, by) {
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

/**
 * @template T
 * @param {Array<T>} array
 * @param {number} at
 * @return Array<T>
 */
export function removeAt(array, at) {
  const result = [...array]
  result.splice(at, 1)
  return result
}

/**
 * @template T
 * @param {Array<T>} array
 * @return {boolean}
 */
export function nonEmpty(array) {
  return array !== undefined && array.length > 0
}