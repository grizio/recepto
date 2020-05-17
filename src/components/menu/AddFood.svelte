<script>
  import i18n from "~/i18n"
  import Button from "~/components/buttons/Button.svelte"
  import InputText from "~/components/fields/InputText.svelte"
  import TwoColumns from "../layout/TwoColumns.svelte"
  import { addFood } from "./Menu"

  /** @type {string} */
  export let categoryId

  let state = "view"
  let name = ""

  function edit() {
    state = "edit"
  }

  function save() {
    addFood(categoryId, name)
    state = "view"
    name = ""
  }

  function cancel() {
    state = "view"
  }
</script>

<style>
  .view {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .edit {
    border-top: 1px solid var(--gray-6);
    padding: 8px;
  }
</style>

{#if state === "view"}
  <div class="view">
    <Button on:click={edit}>
      {$i18n.t("menu.foods.add")}
    </Button>
  </div>
{:else}
  <div class="edit">
    <form on:submit={save}>
      <InputText id="food-name" name="name" label="menu.foods.name" bind:value={name}/>

      <TwoColumns>
        <Button type="primary" submit>
          {$i18n.t("menu.foods.save")}
        </Button>

        <Button on:click={cancel}>
          {$i18n.t("menu.foods.cancel")}
        </Button>
      </TwoColumns>
    </form>
  </div>
{/if}