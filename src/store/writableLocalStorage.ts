import { Writable, writable } from "svelte/store"

export default function writableLocalStorage<T>(key: string, initialValue: T): Writable<T> {
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

function getInitialValue<T>(key: string, fallback: T): T {
  const persistedValue = localStorage.getItem(key)
  if (persistedValue !== null) {
    return JSON.parse(persistedValue)
  } else {
    localStorage.setItem(key, JSON.stringify(fallback))
    return fallback
  }
}
