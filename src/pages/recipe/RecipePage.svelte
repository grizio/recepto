<script>
  import { derived } from "svelte/store"
  import { Link } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import i18n from "../../i18n"

  /** @type {string} */
  export let id = undefined

  /** @type {Ingredient} */
  $: recipe = $receptoStore.recipes.find(recipe => recipe.id === id)
  $: ingredients = recipe.ingredients.map(recipeIngredient => {
    return {
      ...recipeIngredient,
      ref: $receptoStore.ingredients.find(ingredient => ingredient.id === recipeIngredient.id)
    }
  })
  $: madeIngredients = $receptoStore.ingredients.filter(ingredient => {
    return ingredient.recipes.some(_ => _ === id)
  })

  function handleOnDelete() {
    const confirmed = confirm($i18n.t("pages.recipe.page.actions.confirmDelete"))
    if (confirmed) {
      receptoStore.deleteRecipe(id)
    }
  }
</script>

{#if recipe}
  <h1>{recipe.name}</h1>

  <ul>
    <li>{$i18n.t("pages.recipe.page.plates", {count: recipe.plates})}</li>
    <li>{$i18n.t("pages.recipe.page.preparationDuration", {count: recipe.preparationDuration})}</li>
    <li>{$i18n.t("pages.recipe.page.cookingDuration", {count: recipe.cookingDuration})}</li>
    <li>{$i18n.t("pages.recipe.page.totalDuration", {count: recipe.preparationDuration + recipe.cookingDuration})}</li>
  </ul>

  <h2>{$i18n.t("pages.recipe.page.ingredients")}</h2>

  <ul>
    {#each ingredients as ingredient}
      <li>
        {ingredient.quantity} {ingredient.unit}
        <Link to={`/ingredient/${ingredient.id}`}>{ingredient.ref.name}</Link>
      </li>
    {/each}
  </ul>

  <h2>{$i18n.t("pages.recipe.page.steps")}</h2>

  <p>{recipe.steps}</p>

  {#if madeIngredients && madeIngredients.length > 0}
    <h2>{$i18n.t("pages.recipe.page.makes")}</h2>

    <ul>
      {#each madeIngredients as ingredient}
        <li>
          <Link to={`/ingredient/${ingredient.id}`}>
            {ingredient.name}
          </Link>
        </li>
      {/each}
    </ul>
  {/if}

  <Link to={`/recipe/${recipe.id}/update`}>{$i18n.t("pages.recipe.page.actions.modify")}</Link>

  <button on:click={handleOnDelete}>{$i18n.t("pages.recipe.page.actions.delete")}</button>
{:else}
  <h1>{$i18n.t("common.notFound")}</h1>
{/if}