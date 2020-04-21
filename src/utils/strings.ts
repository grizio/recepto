export function canonicalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/ +/gi, "-")
    .replace(/[^a-z0-9-]/gi, "")
}

export function splitParagraphs(value: string): Array<string> {
  return value
    .split("\n")
    .map(_ => _.trim())
    .filter(_ => _.length > 0)
}