<script>
  import {navigate} from "svelte-routing"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import {canonicalize} from "../../utils/strings"
  import IngredientForm from "./IngredientForm.svelte"
  import Page from "../../components/Page.svelte"

  let ingredient = {
    name: "",
    description: "",
    preservations: [],
    preparations: [],
    replacements: [],
    recipes: []
  }

  function handleOnSubmit() {
    const id = canonicalize(ingredient.name)
    receptoStore.addIngredient({id, ...ingredient})
    navigate(`/ingredient/${id}`)
  }
</script>

<Page>
  <h1>{$i18n.t("pages.ingredient.create.title")}</h1>

  <IngredientForm bind:ingredient on:submit={handleOnSubmit}/>
</Page>