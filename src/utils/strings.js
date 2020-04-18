/**
 * @param {string} value
 * @return {string}
 */
export function canonicalize(value) {
  return value
    .toLowerCase()
    .replace(/ +/gi, "-")
    .replace(/[^a-z0-9-]/gi, "")
}

/**
 * @param {string} value
 * @return {Array<value>}
 */
export function splitParagraphs(value) {
  return value
    .split("\n")
    .map(_ => _.trim())
    .filter(_ => _.length > 0)
}