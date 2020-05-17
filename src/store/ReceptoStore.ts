import { Readable, Writable } from "svelte/store"
import writableLocalStorage from "./writableLocalStorage"
import { removeAt, removeWhere, replaceAt, replaceWhere } from "~/utils/arrays"
import { buildInitialReceptoValue, Recepto } from "~/models/Recepto"
import { Food, FoodId, Section } from "~/models/Food"
import { Category } from "~/models/Category"
import { Search } from "~/models/Search"
import { Unit } from "~/models/Unit"

class ReceptoStore implements Readable<Recepto> {
  private internal: Writable<Recepto>

  constructor() {
    this.internal = writableLocalStorage("recepto", buildInitialReceptoValue())
  }

  subscribe: Readable<Recepto>["subscribe"] = (run, invalidate) => {
    return this.internal.subscribe(run, invalidate)
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

  addFoodSection = (id: FoodId, section: Section) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: replaceWhere(
        recepto.foods,
        food => food.id === id,
        food => ({
          ...food,
          sections: [...food.sections, section]
        })
      )
    }))
  }

  updateFoodSection = (id: FoodId, index: number, section: Section) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: replaceWhere(
        recepto.foods,
        food => food.id === id,
        food => ({
          ...food,
          sections: replaceAt(food.sections, index, () => section)
        })
      )
    }))
  }

  deleteFoodSection = (id: FoodId, index: number) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: replaceWhere(
        recepto.foods,
        food => food.id === id,
        food => ({
          ...food,
          sections: removeAt(food.sections, index)
        })
      )
    }))
  }

  deleteFood = (id: string) => {
    this.internal.update(recepto => ({
      ...recepto,
      foods: recepto.foods.filter(_ => _.id !== id)
    }))
  }

  addCategory = (category: Category) => {
    this.internal.update(recepto => ({
      ...recepto,
      categories: [...recepto.categories, category]
    }))
  }

  updateCategory = (category: Category) => {
    this.internal.update(recepto => ({
      ...recepto,
      categories: replaceWhere(recepto.categories, _ => _.id === category.id, () => category)
    }))
  }

  deleteCategory = (id: string) => {
    this.internal.update(recepto => ({
      ...recepto,
      categories: removeWhere(recepto.categories, _ => _.id === id)
    }))
  }

  addSearch = (search: Search) => {
    this.internal.update(recepto => ({
      ...recepto,
      searches: [...recepto.searches, search]
    }))
  }

  removeSearch = (index: number) => {
    this.internal.update(recepto => ({
      ...recepto,
      searches: removeAt(recepto.searches, index)
    }))
  }

  updateUnits = (units: Array<Unit>) => {
    this.internal.update(recepto => ({
      ...recepto,
      units
    }))
  }

  load = (data: Recepto) => {
    this.internal.set(data)
  }
}

const receptoStore = new ReceptoStore()
export default receptoStore