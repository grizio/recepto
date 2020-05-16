<script>
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import Button from "~/components/buttons/Button.svelte"
  import InputText from "~/components/fields/InputText.svelte"
  import { canonicalize } from "~/utils/strings"
  import TwoColumns from "../layout/TwoColumns.svelte"

  let state = "view"
  let name = ""

  function edit() {
    state = "edit"
  }

  function save() {
    receptoStore.addCategory({
      id: canonicalize(name),
      name
    })
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
      {$i18n.t("menu.categories.add")}
    </Button>
  </div>
{:else}
  <div class="edit">
    <form on:submit={save}>
      <InputText id="category-name" name="name" label="menu.categories.name" bind:value={name}/>

      <TwoColumns>
        <Button type="primary" submit>
          {$i18n.t("menu.categories.save")}
        </Button>

        <Button on:click={cancel}>
          {$i18n.t("menu.categories.cancel")}
        </Button>
      </TwoColumns>
    </form>
  </div>
{/if}