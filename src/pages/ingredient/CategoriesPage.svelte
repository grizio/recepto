<script>
  import { navigate } from "svelte-routing"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { canonicalize } from "../../utils/strings"
  import Button from "../../components/buttons/Button.svelte"
  import Page from "../../components/Page.svelte"
  import InputCollection from "../../components/fields/InputCollection.svelte"
  import InputText from "../../components/fields/InputText.svelte"
  import { onMount } from "svelte";

  let categories = []

  onMount(() => {
    categories = [...$receptoStore.ingredientCategories]
  })

  function categoryBuilder() {
    return { id: "", name: "" }
  }

  function handleOnSubmit() {
    const categoriesToSave = categories.map(category => {
      if (category.id === "") {
        return {
          ...category,
          id: canonicalize(category.name)
        }
      } else {
        return category
      }
    })
    receptoStore.updateCategories(categoriesToSave)
  }
</script>

<Page>
  <h1>{$i18n.t("pages.ingredient.categories.title")}</h1>

  <form on:submit|preventDefault={handleOnSubmit}>
    <InputCollection
      title={$i18n.t("pages.ingredient.categories.groupTitle")}
      addButtonLabel={$i18n.t("pages.ingredient.categories.add")}
      removeButtonLabel={$i18n.t("pages.ingredient.categories.remove")}
      rowBuilder={categoryBuilder}
      bind:value={categories}

      let:index={index}
    >
      <InputText
        id={`ingredient-preservation-${index}-name`}
        name={`categories[${index}].name`}
        label={$i18n.t("pages.ingredient.categories.name")}
        bind:value={categories[index].name}
      />
    </InputCollection>

    <Button type="primary" submit>
      {$i18n.t("pages.ingredient.categories.submit")}
    </Button>
  </form>
</Page>