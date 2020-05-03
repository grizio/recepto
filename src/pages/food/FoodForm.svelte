<script>
  import { createEventDispatcher } from 'svelte'
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty } from "~/utils/arrays"
  import {
    getCategoryOptions, getFoodOptions,
    buildPreparation, buildPreservation, buildRecipe, buildReplacement, buildIngredient
  } from "./FoodForm"

  import InputText from "~/components/fields/InputText.svelte"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"
  import InputSelect from "~/components/fields/InputSelect.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"
  import Button from "~/components/buttons/Button.svelte"
  import InputNumber from "~/components/fields/InputNumber.svelte"
  import InputDuration from "~/components/fields/InputDuration.svelte"

  export let food

  let foodOptions, categoryOptions
  $: foodOptions = getFoodOptions($receptoStore, food)
  $: categoryOptions = getCategoryOptions($receptoStore, $i18n)

  const dispatch = createEventDispatcher()

  function handleOnSubmit() {
    dispatch("submit")
  }
</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <InputText
    id="food-name"
    name="name"
    label={$i18n.t("pages.food.form.name")}
    bind:value={food.name}
  />

  <InputSelect
    id="food-category"
    name="category"
    label={$i18n.t("pages.food.form.category.label")}
    options={categoryOptions}
    bind:value={food.category}
  />

  <InputTextarea
    id="food-description"
    name="description"
    label={$i18n.t("pages.food.form.description")}
    bind:value={food.description}
  />

  <InputCollection
    title={$i18n.t("pages.food.form.preservation.title")}
    addButtonLabel={$i18n.t("pages.food.form.preservation.add")}
    removeButtonLabel={$i18n.t("pages.food.form.preservation.remove")}
    rowBuilder={buildPreservation}
    bind:value={food.preservations}

    let:index={index}
  >
    <InputText
      id={`food-preservation-${index}-name`}
      name={`preservation[${index}].name`}
      label={$i18n.t("pages.food.form.preservation.name")}
      bind:value={food.preservations[index].name}
    />

    <InputText
      id={`food-preservation-${index}-duration`}
      name={`preservation[${index}].duration`}
      label={$i18n.t("pages.food.form.preservation.duration")}
      bind:value={food.preservations[index].duration}
    />

    <InputTextarea
      id={`food-preservation-${index}-description`}
      name={`preservation[${index}].description`}
      label={$i18n.t("pages.food.form.preservation.description")}
      bind:value={food.preservations[index].description}
    />
  </InputCollection>

  <InputCollection
    title={$i18n.t("pages.food.form.preparation.title")}
    addButtonLabel={$i18n.t("pages.food.form.preparation.add")}
    removeButtonLabel={$i18n.t("pages.food.form.preparation.remove")}
    rowBuilder={buildPreparation}
    bind:value={food.preparations}

    let:index={index}
  >
    <InputText
      id={`food-preparations-${index}-name`}
      name={`preparation[${index}].name`}
      label={$i18n.t("pages.food.form.preparation.name")}
      bind:value={food.preparations[index].name}
    />

    <InputTextarea
      id={`food-preparation-${index}-description`}
      name={`preparation[${index}].description`}
      label={$i18n.t("pages.food.form.preparation.description")}
      bind:value={food.preparations[index].description}
    />
  </InputCollection>

  {#if nonEmpty(foodOptions)}
    <InputCollection
      title={$i18n.t("pages.food.form.replacement.title")}
      addButtonLabel={$i18n.t("pages.food.form.replacement.add")}
      removeButtonLabel={$i18n.t("pages.food.form.replacement.remove")}
      rowBuilder={() => buildReplacement(foodOptions)}
      bind:value={food.replacements}

      let:index={index}
    >
      <InputSelect
        id={`food-replacements-${index}`}
        name={`replacements[${index}]`}
        label={$i18n.t("pages.food.form.replacement.select")}
        options={foodOptions}
        bind:value={food.replacements[index].food}
      />

      <InputTextarea
        id={`food-replacements-${index}-description`}
        name={`replacements[${index}].description`}
        label={$i18n.t("pages.food.form.replacement.description")}
        bind:value={food.replacements[index].description}
      />
    </InputCollection>
  {/if}

  <InputCollection
    title={$i18n.t("pages.food.form.recipe.title")}
    addButtonLabel={$i18n.t("pages.food.form.recipe.add")}
    removeButtonLabel={$i18n.t("pages.food.form.recipe.remove")}
    rowBuilder={buildRecipe}
    bind:value={food.recipes}

    let:index={index}
  >
    <InputText
      id={`recipe-${index}-name`}
      name={`recipe[${index}].name`}
      label={$i18n.t("pages.food.form.recipe.name")}
      bind:value={food.recipes[index].name}
    />

    <InputNumber
      id={`recipe-${index}-plates`}
      name={`recipe[${index}].plates`}
      label={$i18n.t("pages.food.form.recipe.plates")}
      bind:value={food.recipes[index].plates}
    />

    <InputDuration
      id={`recipe-${index}-duration`}
      name={`recipe[${index}].duration`}
      label={$i18n.t("pages.food.form.recipe.duration")}
      bind:value={food.recipes[index].duration}
    />

    <InputCollection
      title={$i18n.t("pages.food.form.recipe.ingredient.title")}
      addButtonLabel={$i18n.t("pages.food.form.recipe.ingredient.add")}
      removeButtonLabel={$i18n.t("pages.food.form.recipe.ingredient.remove")}
      rowBuilder={() => buildIngredient(foodOptions)}
      bind:value={food.recipes[index].ingredients}

      let:index={indexIngredient}
    >
      <InputSelect
        id={`recipe-${index}-ingredients-${indexIngredient}-id`}
        name={`recipe[${index}].ingredients[${indexIngredient}].id`}
        label={$i18n.t("pages.food.form.recipe.ingredient.id")}
        options={foodOptions}
        bind:value={food.recipes[index].ingredients[indexIngredient].id}
      />

      <InputNumber
        id={`recipe-${index}-ingredients-${indexIngredient}-quantity`}
        name={`recipe[${index}].ingredients[${indexIngredient}].quantity`}
        label={$i18n.t("pages.food.form.recipe.ingredient.quantity")}
        bind:value={food.recipes[index].ingredients[indexIngredient].quantity}
      />

      <InputText
        id={`recipe-${index}-ingredients-${indexIngredient}-unit`}
        name={`recipe[${index}].ingredients[${indexIngredient}].unit`}
        label={$i18n.t("pages.food.form.recipe.ingredient.unit")}
        bind:value={food.recipes[index].ingredients[indexIngredient].unit}
      />
    </InputCollection>

    <InputTextarea
      id={`recipe-${index}-steps`}
      name={`recipe[${index}].steps`}
      label={$i18n.t("pages.food.form.recipe.steps")}
      bind:value={food.recipes[index].steps}
    />
  </InputCollection>

  <Button type="primary" submit>
    {$i18n.t("pages.food.form.submit")}
  </Button>
</form>