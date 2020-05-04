<script>
  import i18n from "~/i18n"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"

  /** @type {Description} */
  export let description
  /** @type {string} */
  export let id
  /** @type {string} */
  export let name

  let idPrefix, namePrefix
  $: idPrefix = id !== undefined ? `${id}-` : ""
  $: namePrefix = name !== undefined ? `${name}.` : ""
</script>

<InputTextarea
  id={`${idPrefix}content`}
  name={`${namePrefix}content`}
  label={$i18n.t("pages.food.form.preparation.description")}
  bind:value={description.content}
/>