<script>
  import i18n from "~/i18n"
  import { buildIngredient } from "./RecipeForm"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"
  import InputSelect from "~/components/fields/InputSelect.svelte"
  import InputText from "~/components/fields/InputText.svelte"
  import InputNumber from "~/components/fields/InputNumber.svelte"
  import InputDuration from "~/components/fields/InputDuration.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"

  /** @type {Recipe} */
  export let recipe
  /** @type {Array<Option>} */
  export let foodOptions
  /** @type {string} */
  export let id
  /** @type {string} */
  export let name

  let idPrefix, namePrefix
  $: idPrefix = id !== undefined ? `${id}-` : ""
  $: namePrefix = name !== undefined ? `${name}.` : ""
</script>

<InputText
  id={`${idPrefix}name`}
  name={`${namePrefix}name`}
  label={$i18n.t("pages.food.form.recipe.name")}
  bind:value={recipe.name}
/>

<InputNumber
  id={`${idPrefix}plates`}
  name={`${namePrefix}plates`}
  label={$i18n.t("pages.food.form.recipe.plates")}
  bind:value={recipe.plates}
/>

<InputDuration
  id={`${idPrefix}duration`}
  name={`${namePrefix}duration`}
  label={$i18n.t("pages.food.form.recipe.duration")}
  bind:value={recipe.duration}
/>

<InputCollection
  title={$i18n.t("pages.food.form.recipe.ingredient.title")}
  addButtonLabel={$i18n.t("pages.food.form.recipe.ingredient.add")}
  removeButtonLabel={$i18n.t("pages.food.form.recipe.ingredient.remove")}
  rowBuilder={() => buildIngredient(foodOptions)}
  bind:value={recipe.ingredients}

  let:index={index}
>
  <InputSelect
    id={`${idPrefix}ingredients-${index}-id`}
    name={`${namePrefix}ingredients[${index}].id`}
    label={$i18n.t("pages.food.form.recipe.ingredient.id")}
    options={foodOptions}
    bind:value={recipe.ingredients[index].id}
  />

  <InputNumber
    id={`${idPrefix}ingredients-${index}-quantity`}
    name={`${namePrefix}ingredients[${index}].quantity`}
    label={$i18n.t("pages.food.form.recipe.ingredient.quantity")}
    bind:value={recipe.ingredients[index].quantity}
  />

  <InputText
    id={`${idPrefix}ingredients-${index}-unit`}
    name={`${namePrefix}ingredients[${index}].unit`}
    label={$i18n.t("pages.food.form.recipe.ingredient.unit")}
    bind:value={recipe.ingredients[index].unit}
  />
</InputCollection>

<InputTextarea
  id={`${idPrefix}steps`}
  name={`${namePrefix}steps`}
  label={$i18n.t("pages.food.form.recipe.steps")}
  bind:value={recipe.steps}
/>