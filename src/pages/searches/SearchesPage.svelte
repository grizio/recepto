<script>
  import { onMount } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"

  import Button from "~/components/buttons/Button.svelte"
  import Page from "~/components/Page.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"
  import InputText from "~/components/fields/InputText.svelte"

  import { buildNewSearch, initializeSearches, updateSearches } from "./SearchesPage"

  let searches = []

  onMount(() => {
    searches = initializeSearches($receptoStore)
  })
</script>

<Page>
  <h1>{$i18n.t("pages.searches.page.title")}</h1>

  <form on:submit|preventDefault={() => updateSearches(searches)}>
    <InputCollection
      title={$i18n.t("pages.searches.page.groupTitle")}
      addButtonLabel={$i18n.t("pages.searches.page.add")}
      removeButtonLabel={$i18n.t("pages.searches.page.remove")}
      rowBuilder={buildNewSearch}
      bind:value={searches}

      let:index={index}
    >
      <InputText
        id={`searches-${index}-sitename`}
        name={`searches[${index}].sitename`}
        label={$i18n.t("pages.searches.page.sitename")}
        bind:value={searches[index].sitename}
      />

      <InputText
        id={`searches-${index}-url`}
        name={`searches[${index}].url`}
        label={$i18n.t("pages.searches.page.url")}
        bind:value={searches[index].url}
      />
    </InputCollection>

    <Button type="primary" submit>
      {$i18n.t("pages.searches.page.submit")}
    </Button>
  </form>
</Page>