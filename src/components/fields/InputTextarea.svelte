<script>
  import Field from "./Field.svelte";

  export let id
  export let name
  export let label

  export let value
</script>

<Field>
  <label for={id} class="field-label">{label}</label>
  <textarea name={name} id={id} bind:value={value} class="field-input"></textarea>
</Field>