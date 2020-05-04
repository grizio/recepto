import { Writable, writable } from "svelte/store"

export function createTestStore(initialValue: number): Writable<number> {
  return writable(initialValue)
}