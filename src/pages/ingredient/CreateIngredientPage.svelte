<script>
  import { navigate } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import { canonicalize } from "../../utils/strings"
  import IngredientForm from "./IngredientForm.svelte";

  let ingredient = {
    name: "",
    description: "",
    preservations: [],
    recipes: []
  }

  function handleOnSubmit() {
    const id = canonicalize(ingredient.name)
    receptoStore.addIngredient({ id, ...ingredient })
    navigate(`/ingredient/${id}`)
  }
</script>

<IngredientForm bind:ingredient on:submit={handleOnSubmit} />