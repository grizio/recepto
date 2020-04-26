<script>
  import { createEventDispatcher } from 'svelte'
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { sortBy, nonEmpty } from "../../utils/arrays"
  import InputText from "../../components/fields/InputText.svelte"
  import InputTextarea from "../../components/fields/InputTextarea.svelte"
  import InputSelect from "../../components/fields/InputSelect.svelte"
  import InputCollection from "../../components/fields/InputCollection.svelte"
  import Button from "../../components/buttons/Button.svelte";

  export let ingredient

  $: recipeOptions = sortBy($receptoStore.recipes, _ => _.name)
    .map(recipe => ({ label: recipe.name, value: recipe.id }))

  $: ingredientOptions = sortBy($receptoStore.ingredients, _ => _.name)
    .filter(_ => _.id !== ingredient.id)
    .map(recipe => ({ label: recipe.name, value: recipe.id }))

  $: categoryOptions = [
    { label: $i18n.t("pages.ingredient.form.category.none"), value: undefined },
    ...sortBy($receptoStore.ingredientCategories, _ => _.name)
      .map(recipe => ({ label: recipe.name, value: recipe.id }))
  ]

  const dispatch = createEventDispatcher()

  function handleOnSubmit() {
    dispatch("submit")
  }

  function preservationBuilder() {
    return {
      name: "",
      duration: "",
      description: ""
    }
  }

  function preparationBuilder() {
    return {
      name: "",
      description: ""
    }
  }

  function replacementBuilder() {
    return { ingredient: ingredientOptions[0].value, description: "" }
  }

  function recipeBuilder() {
    return recipeOptions[0].value
  }
</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <InputText
    id="ingredient-name"
    name="name"
    label={$i18n.t("pages.ingredient.form.name")}
    bind:value={ingredient.name}
  />

  <InputSelect
    id="ingredient-category"
    name="category"
    label={$i18n.t("pages.ingredient.form.category.label")}
    options={categoryOptions}
    bind:value={ingredient.category}
  />

  <InputTextarea
    id="ingredient-description"
    name="description"
    label={$i18n.t("pages.ingredient.form.description")}
    bind:value={ingredient.description}
  />

  <InputCollection
    title={$i18n.t("pages.ingredient.form.preservation.title")}
    addButtonLabel={$i18n.t("pages.ingredient.form.preservation.add")}
    removeButtonLabel={$i18n.t("pages.ingredient.form.preservation.remove")}
    rowBuilder={preservationBuilder}
    bind:value={ingredient.preservations}

    let:index={index}
  >
    <InputText
      id={`ingredient-preservation-${index}-name`}
      name={`preservation[${index}].name`}
      label={$i18n.t("pages.ingredient.form.preservation.name")}
      bind:value={ingredient.preservations[index].name}
    />

    <InputText
      id={`ingredient-preservation-${index}-duration`}
      name={`preservation[${index}].duration`}
      label={$i18n.t("pages.ingredient.form.preservation.duration")}
      bind:value={ingredient.preservations[index].duration}
    />

    <InputTextarea
      id={`ingredient-preservation-${index}-description`}
      name={`preservation[${index}].description`}
      label={$i18n.t("pages.ingredient.form.preservation.description")}
      bind:value={ingredient.preservations[index].description}
    />
  </InputCollection>

  <InputCollection
    title={$i18n.t("pages.ingredient.form.preparation.title")}
    addButtonLabel={$i18n.t("pages.ingredient.form.preparation.add")}
    removeButtonLabel={$i18n.t("pages.ingredient.form.preparation.remove")}
    rowBuilder={preparationBuilder}
    bind:value={ingredient.preparations}

    let:index={index}
  >
    <InputText
      id={`ingredient-preparations-${index}-name`}
      name={`preparation[${index}].name`}
      label={$i18n.t("pages.ingredient.form.preparation.name")}
      bind:value={ingredient.preparations[index].name}
    />

    <InputTextarea
      id={`ingredient-preparation-${index}-description`}
      name={`preparation[${index}].description`}
      label={$i18n.t("pages.ingredient.form.preparation.description")}
      bind:value={ingredient.preparations[index].description}
    />
  </InputCollection>

  {#if nonEmpty(ingredientOptions)}
    <InputCollection
      title={$i18n.t("pages.ingredient.form.replacement.title")}
      addButtonLabel={$i18n.t("pages.ingredient.form.replacement.add")}
      removeButtonLabel={$i18n.t("pages.ingredient.form.replacement.remove")}
      rowBuilder={replacementBuilder}
      bind:value={ingredient.replacements}

      let:index={index}
    >
      <InputSelect
        id={`ingredient-replacements-${index}`}
        name={`replacements[${index}]`}
        label={$i18n.t("pages.ingredient.form.replacement.select")}
        options={ingredientOptions}
        bind:value={ingredient.replacements[index].ingredient}
      />

      <InputTextarea
        id={`ingredient-replacements-${index}-description`}
        name={`replacements[${index}].description`}
        label={$i18n.t("pages.ingredient.form.replacement.description")}
        bind:value={ingredient.replacements[index].description}
      />
    </InputCollection>
  {/if}

  <InputCollection
    title={$i18n.t("pages.ingredient.form.recipe.title")}
    addButtonLabel={$i18n.t("pages.ingredient.form.recipe.add")}
    removeButtonLabel={$i18n.t("pages.ingredient.form.recipe.remove")}
    rowBuilder={recipeBuilder}
    bind:value={ingredient.recipes}

    let:index={index}
  >
    <InputSelect
      id={`ingredient-recipes-${index}`}
      name={`recipes[${index}]`}
      label={$i18n.t("pages.ingredient.form.recipe.select")}
      options={recipeOptions}
      bind:value={ingredient.recipes[index]}
    />
  </InputCollection>

  <Button type="primary" submit>
    {$i18n.t("pages.ingredient.form.submit")}
  </Button>
</form>