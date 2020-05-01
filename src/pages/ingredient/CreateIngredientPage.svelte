<script>
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { buildNewIngredient, addIngredient } from "./CreateIngredientPage";

  import IngredientForm from "./IngredientForm.svelte"
  import Page from "../../components/Page.svelte"

  let ingredient = buildNewIngredient()
</script>

<Page>
  <h1>{$i18n.t("pages.ingredient.create.title")}</h1>

  <IngredientForm bind:ingredient on:submit={() => addIngredient(ingredient)}/>
</Page>