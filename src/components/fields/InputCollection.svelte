<script>
  import { removeAt } from "~/utils/arrays"
  import Button from "~/components/buttons/Button.svelte"

  export let title
  export let addButtonLabel
  export let removeButtonLabel
  export let rowBuilder

  export let value

  function addRow() {
    value = [...value, rowBuilder()]
  }

  function removeRow(index) {
    value = removeAt(value, index)
  }
</script>

<style>
  fieldset {
    border-radius: 2px;
    margin-bottom: 8px;
    border: 1px solid #f0f0f0;
  }

  .legend {
    margin-bottom: 16px;
    font-size: 1.4rem;
    font-weight: 500;
  }

  .group {
    border: 1px solid #d9d9d9;
    background: #fbfbfb;
    padding: 24px;
    margin-bottom: 16px;
  }
</style>

<fieldset>
  <div class="legend">{title}</div>

  {#each value as row, index}
    <div class="group">
      <slot {index}/>

      <Button on:click={() => removeRow(index)}>{removeButtonLabel}</Button>
    </div>
  {/each}

  <Button on:click={addRow}>{addButtonLabel}</Button>
</fieldset>