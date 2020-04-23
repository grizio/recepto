import { Ingredient } from "./Ingredient"
import { Recipe } from "./Recipe"
import { IngredientCategory } from "./IngredientCategory"

export type Recepto = {
  ingredientCategories: Array<IngredientCategory>
  ingredients: Array<Ingredient>
  recipes: Array<Recipe>
}