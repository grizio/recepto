<script>
  import i18n from "~/i18n"
  import { buildNewFood, addFood } from "./CreateFoodPage"

  import Page from "~/components/Page.svelte"
  import Button from "~/components/buttons/Button.svelte"
  import PrimaryInformationForm from "./primaryInformation/PrimaryInformationForm.svelte"

  let food = buildNewFood()
</script>

<Page>
  <h1>{$i18n.t("pages.food.create.title")}</h1>

  <form on:submit|preventDefault={() => addFood(food)}>
    <PrimaryInformationForm food={food} />

    <Button type="primary" submit>
      {$i18n.t("pages.food.form.submit")}
    </Button>
  </form>
</Page>