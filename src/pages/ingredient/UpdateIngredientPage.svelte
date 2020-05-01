<script>
  import { onMount } from "svelte"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { getIngredient, updateIngredient } from "./UpdateIngredientPage"

  import IngredientForm from "./IngredientForm.svelte"
  import Page from "../../components/Page.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {Ingredient} */
  let ingredient
  /** @type {string} */
  let initialName

  onMount(() => {
    ingredient = getIngredient($receptoStore, id)
    initialName = ingredient ? ingredient.name : undefined
  })
</script>

<Page>
  {#if ingredient}
    <h1>{$i18n.t("pages.ingredient.update.title", {ingredient: initialName})}</h1>

    <IngredientForm bind:ingredient on:submit={() => updateIngredient(ingredient)}/>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>