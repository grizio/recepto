<script>
  import InputText from "~/components/fields/InputText.svelte"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"

  /** @type {Preservation} */
  export let preservation
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
  label="pages.food.form.preservation.name"
  bind:value={preservation.name}
/>

<InputText
  id={`${idPrefix}duration`}
  name={`${namePrefix}duration`}
  label="pages.food.form.preservation.duration"
  bind:value={preservation.duration}
/>

<InputTextarea
  id={`${idPrefix}description`}
  name={`${namePrefix}description`}
  label="pages.food.form.preservation.description"
  bind:value={preservation.description}
/>