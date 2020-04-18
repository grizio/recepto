<script>
  import Field from "./Field.svelte";

  export let id
  export let name
  export let label

  export let value
</script>

<Field>
  <label for={id}>{label}</label>
  <textarea name={name} id={id} bind:value={value}></textarea>
</Field>