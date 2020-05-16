<script>
  import { onMount } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import Page from "~/components/Page.svelte"
  import UpdatableSection from "~/components/updatable/UpdatableSection.svelte"
  import InputText from "~/components/fields/InputText.svelte"
  import { findCategory, saveCategory, deleteCategory } from "./CategoryPage"
  import Button from "../../components/buttons/Button.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {string} */
  let name = ""

  let category
  $: category = findCategory($receptoStore, id)

  onMount(() => {
    name = category.name
  })

  function saveName() {
    saveCategory(id, name)
  }

  function cancelName() {
    name = category.name
  }
</script>

<Page>
  {#if category !== undefined}
    <UpdatableSection on:save={saveName} on:cancel={cancelName}>
      <div slot="view">
        <h1>{ category.name }</h1>
      </div>

      <div slot="edit">
        <InputText id="edit-category-name" name="name" label="pages.category.page.edit.name" bind:value={name}/>
      </div>
    </UpdatableSection>

    <div class="actions">
      <Button danger on:click={() => deleteCategory(id, $i18n)}>{$i18n.t("pages.category.page.actions.delete")}</Button>
    </div>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>