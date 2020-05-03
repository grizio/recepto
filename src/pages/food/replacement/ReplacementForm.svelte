<script>
  import i18n from "~/i18n"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"
  import InputSelect from "~/components/fields/InputSelect.svelte"

  /** @type {Replacement} */
  export let replacement
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

<InputSelect
  id={`${idPrefix}food`}
  name={`${namePrefix}food`}
  label={$i18n.t("pages.food.form.replacement.select")}
  options={foodOptions}
  bind:value={replacement.food}
/>

<InputTextarea
  id={`${idPrefix}description`}
  name={`${namePrefix}description`}
  label={$i18n.t("pages.food.form.replacement.description")}
  bind:value={replacement.description}
/>