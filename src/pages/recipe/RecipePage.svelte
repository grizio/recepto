<script>
  import { derived } from "svelte/store"
  import receptoStore from "../../store/ReceptoStore"
  import { Link } from "svelte-routing"

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
    const confirmed = confirm("Do you really want to delete this recipe ?")
    if (confirmed) {
      receptoStore.deleteRecipe(id)
    }
  }
</script>

{#if recipe}
  <h1>{recipe.name}</h1>

  <ul>
    <li>Plates: {recipe.plates}</li>
    <li>Preparation duration: {recipe.preparationDuration}</li>
    <li>Cooking duration: {recipe.cookingDuration}</li>
    <li>Total duration: {recipe.preparationDuration + recipe.cookingDuration}</li>
  </ul>

  <h2>Ingredients</h2>

  <ul>
    {#each ingredients as ingredient}
      <li>
        {ingredient.quantity} {ingredient.unit}
        <Link to={`/ingredient/${ingredient.id}`}>{ingredient.ref.name}</Link>
      </li>
    {/each}
  </ul>

  <h2>Steps</h2>

  <p>{recipe.steps}</p>

  {#if madeIngredients && madeIngredients.length > 0}
    <h2>Makes</h2>

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

  <Link to={`/recipe/${recipe.id}/update`}>Modify</Link>

  <button on:click={handleOnDelete}>Delete</button>
{:else}
  <h1>Not found</h1>
{/if}