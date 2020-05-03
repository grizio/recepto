<script>
  import { createEventDispatcher } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty } from "~/utils/arrays"
  import {
    getCategoryOptions, getFoodOptions,
    buildPreparation, buildPreservation, buildRecipe, buildReplacement
  } from "./FoodForm"

  import InputText from "~/components/fields/InputText.svelte"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"
  import InputSelect from "~/components/fields/InputSelect.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"
  import Button from "~/components/buttons/Button.svelte"
  import InputNumber from "~/components/fields/InputNumber.svelte"
  import InputDuration from "~/components/fields/InputDuration.svelte"
  import PreservationForm from "./preservation/PreservationForm.svelte"
  import PreparationForm from "./preparation/PreparationForm.svelte"
  import ReplacementForm from "./replacement/ReplacementForm.svelte"
  import RecipeForm from "./recipe/RecipeForm.svelte"

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
    <PreservationForm
      bind:preservation={food.preservations[index]}
      id={`food-preservation-${index}`}
      name={`preservation[${index}]`}
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
    <PreparationForm
      bind:preparation={food.preparations[index]}
      id={`food-preparations-${index}`}
      name={`preparation[${index}]`}
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
      <ReplacementForm
        bind:replacement={food.replacements[index]}
        foodOptions={foodOptions}
        id={`food-replacements-${index}`}
        name={`replacements[${index}]`}
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
    <RecipeForm
      bind:recipe={food.recipes[index]}
      foodOptions={foodOptions}
      id={`recipe-${index}`}
      name={`recipe[${index}]`}
    />
  </InputCollection>

  <Button type="primary" submit>
    {$i18n.t("pages.food.form.submit")}
  </Button>
</form>