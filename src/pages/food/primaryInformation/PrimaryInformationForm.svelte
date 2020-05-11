<script>
  import receptoStore from "~/store/ReceptoStore"
  import i18n from "~/i18n"
  import InputText from "~/components/fields/InputText.svelte"
  import InputSelect from "~/components/fields/InputSelect.svelte"

  import { getCategoryOptions } from "./PrimaryInformationForm"

  /** @type {PrimaryInformation} */
  export let primaryInformation

  /** @type {Array<NullableOption>} */
  let categoryOptions
  $: categoryOptions = getCategoryOptions($receptoStore, $i18n)
</script>

<InputText
  id="food-name"
  name="name"
  label="pages.food.form.name"
  bind:value={primaryInformation.name}
/>

<InputSelect
  id="food-category"
  name="category"
  label="pages.food.form.category.label"
  options={categoryOptions}
  bind:value={primaryInformation.category}
/>