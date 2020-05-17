export type Nullable<T> = T | undefined | null

export function onDefined<T, U>(value: Nullable<T>, op: (value: T) => U): U | undefined {
  if (value !== undefined && value !== null) {
    return op(value)
  } else {
    return undefined
  }
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}