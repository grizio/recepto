import { writable } from "svelte/store"

/**
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @return {Writable<T>}
 */
export default function writableLocalStorage(key, initialValue) {
  const storage = writable(getInitialValue(key, initialValue))
  storage.subscribe((newValue) => {
    if (newValue === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  })
  return storage
}

/**
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @return {T}
 */
function getInitialValue(key, fallback) {
  const persistedValue = localStorage.getItem(key)
  if (persistedValue !== null) {
    return JSON.parse(persistedValue)
  } else {
    localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }
}
