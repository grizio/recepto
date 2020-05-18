<script>
  import { addUnit } from "./RecipeForm"

  import Button from "~/components/buttons/Button.svelte"
  import InputText from "~/components/fields/InputText.svelte"

  let state = "view"

  let code = ""
  let label = ""

  function edit() {
    state = "edit"
  }

  function save() {
    addUnit(code, label)
    state = "view"
    code = ""
    label = ""
  }

  function cancel() {
    state = "view"
  }
</script>

<style>
  .add-unit {
    margin-left: 4px;
    flex-grow: 1;
  }

  .actions, .two-actions {
    margin-bottom: 8px;
  }

  .two-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
    align-items: end;
  }
</style>

<div class="add-unit" class:view={state === "view"}>
  {#if state === "view"}
    <div class="actions">
      <Button on:click={edit}>
        &#x2795
      </Button>
    </div>
  {:else}
    <form on:submit={save}>
      <InputText
        id="unit-code"
        name="code"
        label="pages.food.units.code"
        bind:value={code}
      />

      <InputText
        id="unit-label"
        name="label"
        label="pages.food.units.label"
        bind:value={label}
      />

      <div class="two-actions">
        <Button type="primary" submit>
          &#x2714
        </Button>

        <Button on:click={cancel}>
          &#x274C
        </Button>
      </div>
    </form>
  {/if}
</div>