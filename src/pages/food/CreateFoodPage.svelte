<script>
  import i18n from "~/i18n"
  import { buildPrimaryInformation, addFood } from "./CreateFoodPage"

  import Page from "~/components/Page.svelte"
  import Button from "~/components/buttons/Button.svelte"
  import PrimaryInformationForm from "./primaryInformation/PrimaryInformationForm.svelte"

  let primaryInformation = buildPrimaryInformation()
</script>

<Page>
  <h1>{$i18n.t("pages.food.create.title")}</h1>

  <form on:submit|preventDefault={() => addFood(primaryInformation)}>
    <PrimaryInformationForm primaryInformation={primaryInformation} />

    <Button type="primary" submit>
      {$i18n.t("pages.food.form.submit")}
    </Button>
  </form>
</Page>