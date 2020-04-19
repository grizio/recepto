<script>
  import {onMount} from "svelte"
  import {get} from "svelte/store"
  import {navigate} from "svelte-routing"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import IngredientForm from "./IngredientForm.svelte"
  import Page from "../../components/Page.svelte"

  /** @type {string} */
  export let id = undefined

  let ingredient = undefined
  let initialName = undefined

  onMount(() => {
    ingredient = get(receptoStore).ingredients.find(ingredient => ingredient.id === id)
    initialName = ingredient ? ingredient.name : undefined
  })

  function handleOnSubmit() {
    receptoStore.updateIngredient({
      ...ingredient,
      id
    })
    navigate(`/ingredient/${id}`)
  }
</script>

<Page>
  {#if ingredient}
    <h1>{$i18n.t("pages.ingredient.update.title", {ingredient: initialName})}</h1>

    <IngredientForm bind:ingredient on:submit={handleOnSubmit}/>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>