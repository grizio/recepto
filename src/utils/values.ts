export function onDefined<T, U>(value: T | undefined, op: (value: T) => U): U | undefined {
  if (value !== undefined && value !== null) {
    return op(value)
  } else {
    return undefined
  }
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}