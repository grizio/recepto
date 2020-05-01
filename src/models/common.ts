export type Option = {
  label: string
  value: string
}

export type EmptyOption = {
  label: string
  value: undefined
}

export type NullableOption = Option | EmptyOption