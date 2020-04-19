<script>
  import {navigate} from "svelte-routing"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import {canonicalize} from "../../utils/strings"
  import RecipeForm from "./RecipeForm.svelte"
  import Page from "../../components/Page.svelte"

  let recipe = {
    name: "",
    plates: 1,
    preparationDuration: 0,
    cookingDuration: 0,
    ingredients: [],
    steps: ""
  }

  function handleOnSubmit() {
    const id = canonicalize(recipe.name)
    receptoStore.addRecipe({id, ...recipe})
    navigate(`/recipe/${id}`)
  }
</script>

<Page>
  <h1>{$i18n.t("pages.recipe.create.title")}</h1>

  <RecipeForm bind:recipe on:submit={handleOnSubmit}/>
</Page>