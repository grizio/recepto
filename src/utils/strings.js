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