<script>
  import { removeAt } from "../../utils/arrays";

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
    background-color: #f1f5f7;
    border: none;
  }

  .legend {
    margin-bottom: 16px;
    font-size: 1.4rem;
    font-weight: 500;
  }

  .group {
    border-left: 4px solid #adb5bd;
    padding-left: 4px;
    margin-bottom: 16px;
  }
</style>

<fieldset>
  <div class="legend">{title}</div>

  {#each value as row, index}
    <div class="group">
      <slot {index}/>

      <button on:click|preventDefault={() => removeRow(index)}>{removeButtonLabel}</button>
    </div>
  {/each}

  <button on:click|preventDefault={addRow}>{addButtonLabel}</button>
</fieldset>