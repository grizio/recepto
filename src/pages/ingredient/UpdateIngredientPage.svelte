<script>
  import { onMount } from "svelte"
  import { get } from "svelte/store"
  import { navigate } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import IngredientForm from "./IngredientForm.svelte"

  /** @type {string} */
  export let id = undefined

  let ingredient = undefined

  onMount(() => {
    ingredient = get(receptoStore).ingredients.find(ingredient => ingredient.id === id)
  })

  function handleOnSubmit() {
    receptoStore.updateIngredient({
      ...ingredient,
      id
    })
    navigate(`/ingredient/${id}`)
  }
</script>

{#if ingredient}
  <IngredientForm bind:ingredient on:submit={handleOnSubmit}/>
{:else}
  <h1>Not found</h1>
{/if}