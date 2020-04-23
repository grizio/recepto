import { Readable, Writable } from "svelte/store"
import writableLocalStorage from "./writableLocalStorage"
import { replaceWhere } from "../utils/arrays"
import { Recepto } from "../models/Recepto"
import { Ingredient } from "../models/Ingredient"
import { Recipe } from "../models/Recipe"
import { IngredientCategory } from "../models/IngredientCategory"

class ReceptoStore implements Readable<Recepto> {
  private internal: Writable<Recepto>

  constructor() {
    this.internal = writableLocalStorage("recepto", {
      ingredientCategories: [],
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

  addRecipe = (recipe: Recipe) => {
    this.internal.update(recepto => ({
      ...recepto,
      recipes: [...recepto.recipes, recipe]
    }))
  }

  updateRecipe = (recipe: Recipe) => {
    this.internal.update(recepto => ({
      ...recepto,
      recipes: replaceWhere(recepto.recipes, _ => _.id === recipe.id, () => recipe)
    }))
  }

  deleteRecipe = (id: string) => {
    this.internal.update(recepto => ({
      ...recepto,
      recipes: recepto.recipes.filter(_ => _.id !== id)
    }))
  }

  updateCategories = (categories: Array<IngredientCategory>) => {
    const categoryIds = categories.map(_ => _.id)
    this.internal.update(recepto => ({
      ...recepto,
      ingredientCategories: categories,
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