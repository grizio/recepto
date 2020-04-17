import writableLocalStorage from "./writableLocalStorage";
import { replaceWhere } from "../utils/arrays";

/**
 * @implements Readable<Recepto>
 */
class ReceptoStore {
  constructor() {
    this.internal = writableLocalStorage("recepto", {
      ingredients: [],
      recipes: []
    })
  }

  subscribe = (run, invalidate) => {
    return this.internal.subscribe(run, invalidate);
  }

  /**
   * @param {Ingredient} ingredient
   */
  addIngredient = (ingredient) => {
    this.internal.update(recepto => ({
      ...recepto,
      ingredients: [...recepto.ingredients, ingredient]
    }))
  }

  /**
   * @param {Ingredient} ingredient
   */
  updateIngredient = (ingredient) => {
    this.internal.update(recepto => ({
      ...recepto,
      ingredients: replaceWhere(recepto.ingredients, _ => _.id === ingredient.id, () => ingredient)
    }))
  }

  /**
   * @param {string} id
   */
  deleteIngredient = (id) => {
    this.internal.update(recepto => ({
      ...recepto,
      ingredients: recepto.ingredients.filter(_ => _.id !== id)
    }))
  }

  /**
   * @param {Recipe} recipe
   */
  addRecipe = (recipe) => {
    this.internal.update(recepto => ({
      ...recepto,
      recipes: [...recepto.recipes, recipe]
    }))
  }

  /**
   * @param {Recipe} ingredient
   */
  updateRecipe = (recipe) => {
    this.internal.update(recepto => ({
      ...recepto,
      recipes: replaceWhere(recepto.recipes, _ => _.id === recipe.id, () => recipe)
    }))
  }

  /**
   * @param {Recipe} id
   */
  deleteRecipe = (id) => {
    this.internal.update(recepto => ({
      ...recepto,
      recipes: recepto.recipes.filter(_ => _.id !== id)
    }))
  }
}

const receptoStore = new ReceptoStore()
export default receptoStore