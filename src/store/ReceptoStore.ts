import { Readable, Writable } from "svelte/store"
import writableLocalStorage from "./writableLocalStorage"
import { replaceWhere } from "../utils/arrays"
import { Recepto } from "../models/Recepto"
import { Food } from "../models/Food"
import { Category } from "../models/Category"

class ReceptoStore implements Readable<Recepto> {
  private internal: Writable<Recepto>

  constructor() {
    this.internal = writableLocalStorage("recepto", {
      categories: [],
      foods: [],
    })
  }

  subscribe: Readable<Recepto>["subscribe"] = (run, invalidate) => {
    return this.internal.subscribe(run, invalidate);
  }

  addFood = (food: Food) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: [...recepto.foods, food]
    }))
  }

  updateFood = (food: Food) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: replaceWhere(recepto.foods, _ => _.id === food.id, () => food)
    }))
  }

  deleteFood = (id: string) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: recepto.foods.filter(_ => _.id !== id)
    }))
  }

  updateCategories = (categories: Array<Category>) => {
    const categoryIds = categories.map(_ => _.id)
    this.internal.update(recepto => ({
      ...recepto,
      categories: categories,
      ingredients: recepto.foods.map(food => {
        if (food.category === undefined || categoryIds.includes(food.category)) {
          return food
        } else {
          return { ...food, category: undefined }
        }
      })
    }))
  }

  load = (data: Recepto) => {
    this.internal.set(data)
  }
}

const receptoStore = new ReceptoStore()
export default receptoStore