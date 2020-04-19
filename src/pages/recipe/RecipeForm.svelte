<script>
  import { createEventDispatcher } from 'svelte'
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { sortBy } from "../../utils/arrays"
  import InputTextarea from "../../components/fields/InputTextarea.svelte"
  import InputText from "../../components/fields/InputText.svelte"
  import InputNumber from "../../components/fields/InputNumber.svelte"
  import InputCollection from "../../components/fields/InputCollection.svelte"
  import InputSelect from "../../components/fields/InputSelect.svelte"
  import Button from "../../components/buttons/Button.svelte"

  export let recipe

  $: ingredientOptions = sortBy($receptoStore.ingredients, _ => _.name)
    .map(ingredient => ({ value: ingredient.id, label: ingredient.name }))

  const dispatch = createEventDispatcher()

  function handleOnSubmit() {
    dispatch("submit")
  }

  function ingredientBuilder() {
    return {
      id: ingredientOptions[0].id,
      quantity: 1,
      unit: ""
    }
  }
</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <InputText
    id="recipe-name"
    name="name"
    label={$i18n.t("pages.recipe.form.name")}
    bind:value={recipe.name}
  />

  <InputText
    id="recipe-shortDescription"
    name="shortDescription"
    label={$i18n.t("pages.recipe.form.shortDescription")}
    bind:value={recipe.shortDescription}
  />

  <InputNumber
    id="recipe-plates"
    name="plates"
    label={$i18n.t("pages.recipe.form.plates")}
    bind:value={recipe.plates}
  />

  <InputNumber
    id="recipe-preparationDuration"
    name="preparationDuration"
    label={$i18n.t("pages.recipe.form.preparationDuration")}
    bind:value={recipe.preparationDuration}
  />

  <InputNumber
    id="recipe-cookingDuration"
    name="cookingDuration"
    label={$i18n.t("pages.recipe.form.cookingDuration")}
    bind:value={recipe.cookingDuration}
  />

  <InputCollection
    title={$i18n.t("pages.recipe.form.ingredient.title")}
    addButtonLabel={$i18n.t("pages.recipe.form.ingredient.add")}
    removeButtonLabel={$i18n.t("pages.recipe.form.ingredient.remove")}
    rowBuilder={ingredientBuilder}
    bind:value={recipe.ingredients}

    let:index={index}
  >
    <InputSelect
      id={`recipe-ingredients-${index}-id`}
      name={`ingredients[${index}].id`}
      label={$i18n.t("pages.recipe.form.ingredient.id")}
      options={ingredientOptions}
      bind:value={recipe.ingredients[index].id}
    />

    <InputNumber
      id={`recipe-ingredients-${index}-quantity`}
      name={`ingredients[${index}].quantity`}
      label={$i18n.t("pages.recipe.form.ingredient.quantity")}
      bind:value={recipe.ingredients[index].quantity}
    />

    <InputText
      id={`recipe-ingredients-${index}-unit`}
      name={`ingredients[${index}].unit`}
      label={$i18n.t("pages.recipe.form.ingredient.unit")}
      bind:value={recipe.ingredients[index].unit}
    />
  </InputCollection>

  <InputTextarea
    id="recipe-steps"
    name="steps"
    label={$i18n.t("pages.recipe.form.steps")}
    bind:value={recipe.steps}
  />

  <Button type="primary" submit>
    {$i18n.t("pages.recipe.form.submit")}
  </Button>
</form>