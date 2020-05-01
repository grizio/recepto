<script>
  import {onMount} from "svelte"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { findRecipe, updateRecipe } from "./UpdateRecipePage"

  import RecipeForm from "./RecipeForm.svelte"
  import Page from "../../components/Page.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {Recipe} */
  let recipe = undefined
  /** @type {string} */
  let initialName = undefined

  onMount(() => {
    recipe = findRecipe($receptoStore, id)
    initialName = recipe ? recipe.name : undefined
  })
</script>

<Page>
  {#if recipe}
    <h1>{$i18n.t("pages.recipe.update.title", {recipe: initialName})}</h1>

    <RecipeForm bind:recipe on:submit={() => updateRecipe(recipe)}/>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>