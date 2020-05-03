<script>
  import { onMount } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"

  import Button from "~/components/buttons/Button.svelte"
  import Page from "~/components/Page.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"
  import InputText from "~/components/fields/InputText.svelte"

  import { buildNewCategory, initializeCategories, updateCategories } from "./CategoriesPage"

  let categories = []

  onMount(() => {
    categories = initializeCategories($receptoStore)
  })
</script>

<Page>
  <h1>{$i18n.t("pages.categories.page.title")}</h1>

  <form on:submit|preventDefault={() => updateCategories(categories)}>
    <InputCollection
      title={$i18n.t("pages.categories.page.groupTitle")}
      addButtonLabel={$i18n.t("pages.categories.page.add")}
      removeButtonLabel={$i18n.t("pages.categories.page.remove")}
      rowBuilder={buildNewCategory}
      bind:value={categories}

      let:index={index}
    >
      <InputText
        id={`ingredient-preservation-${index}-name`}
        name={`categories[${index}].name`}
        label={$i18n.t("pages.categories.page.name")}
        bind:value={categories[index].name}
      />
    </InputCollection>

    <Button type="primary" submit>
      {$i18n.t("pages.categories.page.submit")}
    </Button>
  </form>
</Page>