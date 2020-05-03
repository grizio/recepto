import { Readable, Writable } from "svelte/store"
import writableLocalStorage from "./writableLocalStorage"
import { replaceWhere } from "../utils/arrays"
import { Recepto } from "../models/Recepto"
import { Ingredient } from "../models/Ingredient"
import { Category } from "../models/Category"

class ReceptoStore implements Readable<Recepto> {
  private internal: Writable<Recepto>

  constructor() {
    this.internal = writableLocalStorage("recepto", {
      categories: [],
      ingredients: [],
      recipes: []
    })
  }

  subscribe: Readable<Recepto>["subscribe"] = (run, invalidate) => {
    return this.internal.subscribe(run, invalidate);
  }

  addIngredient = (ingredient: Ingredient) => {
    this.internal.update(recepto => ({
      ...recepto,
      ingredients: [...recepto.ingredients, ingredient]
    }))
  }

  updateIngredient = (ingredient: Ingredient) => {
    this.internal.update(recepto => ({
      ...recepto,
      ingredients: replaceWhere(recepto.ingredients, _ => _.id === ingredient.id, () => ingredient)
    }))
  }

  deleteIngredient = (id: string) => {
    this.internal.update(recepto => ({
      ...recepto,
      ingredients: recepto.ingredients.filter(_ => _.id !== id)
    }))
  }

  updateCategories = (categories: Array<Category>) => {
    const categoryIds = categories.map(_ => _.id)
    this.internal.update(recepto => ({
      ...recepto,
      categories: categories,
      ingredients: recepto.ingredients.map(ingredient => {
        if (ingredient.category === undefined || categoryIds.includes(ingredient.category)) {
          return ingredient
        } else {
          return { ...ingredient, category: undefined }
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