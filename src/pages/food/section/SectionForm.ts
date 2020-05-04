import { i18n } from "i18next"
import { Description, Preparation, Preservation, Recipe, Replacement, Section, SectionType } from "~/models/Food"
import { Option } from "~/models/common"
import { Recepto } from "~/models/Recepto"
import { sortBy } from "~/utils/arrays"

export function getFoodOptions(recepto: Recepto): Array<Option> {
  return sortBy(recepto.foods, _ => _.name)
    .map(recipe => ({ label: recipe.name, value: recipe.id }))
}

export type SectionTypeOption = {
  value: SectionType
  label: string
}

export function buildSectionTypeOptions(i18n: i18n): Array<SectionTypeOption> {
  return [
    { value: "preservation", label: i18n.t("pages.food.form.section.choose.preservation") },
    { value: "preparation", label: i18n.t("pages.food.form.section.choose.preparation") },
    { value: "recipe", label: i18n.t("pages.food.form.section.choose.recipe") },
    { value: "replacement", label: i18n.t("pages.food.form.section.choose.replacement") },
    { value: "description", label: i18n.t("pages.food.form.section.choose.description") },
  ]
}

export function buildSection(sectionType: SectionType, foodOptions: Array<Option>): Section {
  switch (sectionType) {
    case "preservation":
      return buildPreservation()
    case "preparation":
      return buildPreparation()
    case "recipe":
      return buildRecipe()
    case "replacement":
      return buildReplacement(foodOptions)
    case "description":
      return buildDescription()
  }
}

function buildPreservation(): Preservation {
  return {
    type: "preservation",
    name: "",
    duration: "",
    description: ""
  }
}

function buildPreparation(): Preparation {
  return {
    type: "preparation",
    name: "",
    description: ""
  }
}

function buildReplacement(foodOptions: Array<Option>): Replacement {
  return {
    type: "replacement",
    food: foodOptions[0].value,
    description: ""
  }
}

function buildRecipe(): Recipe {
  return {
    type: "recipe",
    name: "",
    plates: 1,
    duration: 0,
    ingredients: [],
    steps: ""
  }
}

function buildDescription(): Description {
  return {
    type: "description",
    content: ""
  }
}
