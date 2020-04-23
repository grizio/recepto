<script>
  import { createEventDispatcher } from 'svelte'
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { sortBy } from "../../utils/arrays"
  import InputText from "../../components/fields/InputText.svelte"
  import InputTextarea from "../../components/fields/InputTextarea.svelte"
  import InputSelect from "../../components/fields/InputSelect.svelte"
  import InputCollection from "../../components/fields/InputCollection.svelte"
  import Button from "../../components/buttons/Button.svelte";

  export let ingredient

  $: recipeOptions = sortBy($receptoStore.recipes, _ => _.name)
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