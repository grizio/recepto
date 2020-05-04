<script>
  import { createEventDispatcher } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty } from "~/utils/arrays"
  import { getCategoryOptions, getFoodOptions } from "./FoodForm"

  import InputText from "~/components/fields/InputText.svelte"
  import InputSelect from "~/components/fields/InputSelect.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"
  import Button from "~/components/buttons/Button.svelte"
  import SectionForm from "./section/SectionForm.svelte"

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
    label="pages.food.form.name"
    bind:value={food.name}
  />

  <InputSelect
    id="food-category"
    name="category"
    label="pages.food.form.category.label"
    options={categoryOptions}
    bind:value={food.category}
  />

  <InputCollection
    title="pages.food.form.section.title"
    addButtonLabel="pages.food.form.section.add"
    removeButtonLabel="pages.food.form.section.remove"
    rowBuilder={() => undefined}
    bind:value={food.sections}

    let:index={index}
  >
    <SectionForm
      bind:section={food.sections[index]}
      id={`food-section-${index}`}
      name={`section[${index}]`}
      foodOptions={foodOptions}
    />
  </InputCollection>

  <Button type="primary" submit>
    {$i18n.t("pages.food.form.submit")}
  </Button>
</form>