<script>
  import { onMount } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import UpdatableSection from "~/components/updatable/UpdatableSection.svelte"
  import InputText from "~/components/fields/InputText.svelte"
  import { findCategory, saveCategory, deleteCategory } from "./CategoryPage"
  import Button from "../../components/buttons/Button.svelte"

  /** @type {string} */
  export let categoryId = undefined

  /** @type {string} */
  let name = ""

  let category
  $: category = findCategory($receptoStore, categoryId)

  onMount(() => {
    name = category.name
  })

  function saveName() {
    saveCategory(categoryId, name)
  }

  function cancelName() {
    name = category.name
  }
</script>

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
    <Button danger
            on:click={() => deleteCategory(categoryId, $i18n)}>{$i18n.t("pages.category.page.actions.delete")}</Button>
  </div>
{:else}
  <h1>{$i18n.t("common.notFound")}</h1>
{/if}