<script>
  import i18n from "~/i18n"
  import Field from "./Field.svelte"

  export let id
  export let name
  export let label

  export let value
</script>

<Field>
  <label for={id} class="field-label">{$i18n.t(label)}</label>
  <input type="file" name={name} id={id} bind:value={value} class="field-input" on:change/>
</Field>