import { navigate } from "svelte-routing"
import { i18n } from "i18next"
import cloneDeep from "lodash/cloneDeep"
import { Food, FoodId, isRecipe, Recipe, Section } from "~/models/Food"
import { Recepto } from "~/models/Recepto"
import receptoStore from "~/store/ReceptoStore"
import { removeAt, replaceAt } from "~/utils/arrays"
import { PrimaryInformation } from "~/pages/food/primaryInformation/PrimaryInformationForm"
import { CategoryId } from "~/models/Category"

export type SectionInfo = {
  initial: Section | undefined
  editing: Section | undefined
}

export type RecipeIngredientInfo = {
  recipe: Recipe
  food: Food
}

export function getFood(recepto: Recepto, categoryId: CategoryId, id: FoodId): Food | undefined {
  return recepto.foods.find(food => food.id === id && food.category === categoryId)
}

export function getPrimaryInformation(food: Food): PrimaryInformation {
  return {
    name: food.name,
    category: food.category
  }
}

export function getSectionInfos(food: Food): Array<SectionInfo> {
  return food.sections.map(section => ({
    initial: section,
    editing: cloneDeep(section)
  }))
}

export function addSectionInfo(sections: Array<SectionInfo>): Array<SectionInfo> {
  return [...sections, { initial: undefined, editing: undefined }]
}

export function persistSection(id: FoodId, sections: Array<SectionInfo>, index: number): Array<SectionInfo> {
  const section = sections[index]
  if (section !== undefined) {
    if (section.editing !== undefined) {
      if (section.initial !== undefined) {
        receptoStore.updateFoodSection(id, index, section.editing)
      } else {
        receptoStore.addFoodSection(id, section.editing)
      }
      return replaceAt(sections, index, (section) => ({
        initial: section.editing,
        editing: cloneDeep(section.editing)
      }))
    } else {
      return removeAt(sections, index)
    }
  } else {
    return sections
  }
}

export function resetSection(sections: Array<SectionInfo>, index: number): Array<SectionInfo> {
  const section = sections[index]
  if (section !== undefined) {
    if (section.initial !== undefined) {
      return replaceAt(sections, index, (section) => ({
        initial: section.initial,
        editing: cloneDeep(section.initial)
      }))
    } else {
      return removeAt(sections, index)
    }
  } else {
    return sections
  }
}

export function deleteSection(id: FoodId, sections: Array<SectionInfo>, index: number, i18n: i18n): Array<SectionInfo> {
  const confirmed = confirm(i18n.t("pages.food.page.actions.confirmRemoveSection"))
  if (confirmed) {
    receptoStore.deleteFoodSection(id, index)
    return removeAt(sections, index)
  } else {
    return sections
  }
}

export function getUsedFor(recepto: Recepto, id: FoodId): Array<RecipeIngredientInfo> {
  return recepto.foods
    .flatMap(food => {
      return food.sections
        .filter(isRecipe)
        .filter(recipe => recipe.ingredients.some(_ => _.id === id))
        .map(recipe => ({ recipe, food }))
    })
}

export function deleteFood(categoryId: CategoryId, foodId: FoodId, i18n: i18n): void {
  const confirmed = confirm(i18n.t("pages.food.page.actions.confirmDelete"))
  if (confirmed) {
    navigate(`/category/${categoryId}`)
    receptoStore.deleteFood(foodId)
  }
}
