/**
 * @template T
 * @template U
 * @param {T | undefined} value
 * @param {function($Values: T): U} op
 * @return { U | undefined }
 */
export function onDefined(value, op) {
  if (value !== undefined && value !== null) {
    return op(value)
  } else {
    return undefined
  }
}