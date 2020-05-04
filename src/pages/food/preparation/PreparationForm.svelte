<script>
  import InputText from "~/components/fields/InputText.svelte"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"

  /** @type {Preparation} */
  export let preparation
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
  label="pages.food.form.preparation.name"
  bind:value={preparation.name}
/>

<InputTextarea
  id={`${idPrefix}description`}
  name={`${namePrefix}description`}
  label="pages.food.form.preparation.description"
  bind:value={preparation.description}
/>