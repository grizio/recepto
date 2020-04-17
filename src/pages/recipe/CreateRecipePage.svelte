<script>
  import { navigate } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import { canonicalize } from "../../utils/strings"
  import RecipeForm from "./RecipeForm.svelte";

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
    receptoStore.addRecipe({ id, ...recipe })
    navigate(`/recipe/${id}`)
  }
</script>

<RecipeForm bind:recipe on:submit={handleOnSubmit}/>