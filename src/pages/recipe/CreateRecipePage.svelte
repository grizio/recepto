<script>
  import {navigate} from "svelte-routing"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { buildNewRecipe, createRecipe } from "./CreateRecipePage"

  import RecipeForm from "./RecipeForm.svelte"
  import Page from "../../components/Page.svelte"

  let recipe = buildNewRecipe()
</script>

<Page>
  <h1>{$i18n.t("pages.recipe.create.title")}</h1>

  <RecipeForm bind:recipe on:submit={() => createRecipe(recipe)}/>
</Page>