<script>
  import { onMount } from "svelte"
  import { get } from "svelte/store"
  import { navigate } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import RecipeForm from "./RecipeForm.svelte"

  /** @type {string} */
  export let id = undefined

  let recipe = undefined

  onMount(() => {
    recipe = get(receptoStore).recipes.find(recipe => recipe.id === id)
  })

  function handleOnSubmit() {
    receptoStore.updateIngredient({
      ...recipe,
      id
    })
    navigate(`/recipe/${id}`)
  }
</script>

{#if recipe}
  <RecipeForm bind:recipe on:submit={handleOnSubmit}/>
{:else}
  <h1>Not found</h1>
{/if}