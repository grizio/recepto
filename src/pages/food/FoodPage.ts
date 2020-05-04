import { i18n } from "i18next"
import { navigate } from "svelte-routing"
import receptoStore from "~/store/ReceptoStore"

import {
  Food,
  FoodId,
  Replacement,
  Recipe,
  Ingredient,
  Preservation,
  Preparation,
  Description,
  Section, isRecipe
} from "~/models/Food"
import { Recepto } from "~/models/Recepto"
import { isDefined, onDefined } from "~/utils/values"

export type FullFood = Omit<Food, "sections"> & {
  sections: Array<FullSection>
  usedFor: Array<RecipeIngredientInfo>
}

type FullSection =
  | Preservation
  | Preparation
  | FullRecipe
  | FullReplacement
  | Description

export type FullRecipe = Omit<Recipe, "ingredients"> & {
  ingredients: Array<FullIngredient>
}

export type FullIngredient = Omit<Ingredient, "id"> & {
  ref: Food
}

export type RecipeIngredientInfo = {
  recipe: Recipe
  food: Food
}

type FullReplacement = Omit<Replacement, "food"> & {
  food: Food
}

export function buildFullFood(recepto: Recepto, id: FoodId | undefined): FullFood | undefined {
  const food = onDefined(id, id => recepto.foods.find(_ => _.id === id))
  if (food !== undefined) {
    return {
      ...food,
      sections: food.sections
        .map(section => buildFullSection(recepto, section))
        .filter(isDefined),
      usedFor: recepto.foods
        .flatMap(food => {
          return food.sections
            .filter(isRecipe)
            .filter(recipe => recipe.ingredients.some(_ => _.id === id))
            .map(recipe => ({ recipe, food }))
        })
    }
  } else {
    return undefined
  }
}

function buildFullSection(recepto: Recepto, section: Section): FullSection | undefined {
  switch (section.type) {
    case "recipe":
      return buildFullRecipe(recepto, section)
    case "replacement":
      return buildReplacement(recepto, section)
    default:
      return section
  }
}

export function buildFullRecipe(recepto: Recepto, recipe: Recipe): FullRecipe {
  return {
    ...recipe,
    ingredients: buildFullIngredients(recepto, recipe)
  }
}

function buildFullIngredients(recepto: Recepto, recipe: Recipe): Array<FullIngredient> {
  return recipe.ingredients
    .map(ingredient => onDefined(
      recepto.foods.find(food => food.id === ingredient.id),
      ref => ({ ...ingredient, ref })
    ))
    .filter(isDefined)
}

function buildReplacement(recepto: Recepto, replacement: Replacement): FullReplacement | undefined {
  return onDefined(
    recepto.foods.find(food => food.id === replacement.food),
    (food) => {
      return {
        ...replacement,
        food
      }
    }
  )
}

export function deleteFood(id: string | undefined, i18n: i18n): void {
  onDefined(id, id => {
    const confirmed = confirm(i18n.t("pages.food.page.actions.confirmDelete"))
    if (confirmed) {
      navigate(`/`)
      receptoStore.deleteFood(id)
    }
  })
}