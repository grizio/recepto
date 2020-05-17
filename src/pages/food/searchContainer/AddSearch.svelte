<script>
  import i18n from "~/i18n"
  import Button from "~/components/buttons/Button.svelte"
  import InputText from "~/components/fields/InputText.svelte"
  import TwoColumns from "~/components/layout/TwoColumns.svelte"
  import { addSearch } from "./SearchContainer"

  let state = "view"
  let sitename = ""
  let url = ""

  function edit() {
    state = "edit"
  }

  function save() {
    addSearch(sitename, url)
    state = "view"
    sitename = ""
    url = ""
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
      {$i18n.t("pages.food.searches.add")}
    </Button>
  </div>
{:else}
  <div class="edit">
    <form on:submit={save}>
      <InputText id="search-name" name="name" label="pages.food.searches.sitename" bind:value={sitename}/>

      <InputText id="search-url" name="url" label="pages.food.searches.url" bind:value={url}/>

      <TwoColumns>
        <Button type="primary" submit>
          {$i18n.t("pages.food.searches.save")}
        </Button>

        <Button on:click={cancel}>
          {$i18n.t("pages.food.searches.cancel")}
        </Button>
      </TwoColumns>
    </form>
  </div>
{/if}