<script>
  import i18n from "~/i18n"
  import Field from "./Field.svelte"

  export let id
  export let name
  export let label
  export let options

  export let value
</script>

<Field>
  <label for={id} class="field-label">{$i18n.t(label)}</label>
  <select name={name} id={id} bind:value={value} class="field-input">
    {#each options as option}
      <option value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
</Field>