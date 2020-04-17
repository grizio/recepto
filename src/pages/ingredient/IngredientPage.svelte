<script>
  import { derived } from "svelte/store"
  import receptoStore from "../../store/ReceptoStore"
  import { Link } from "svelte-routing"

  /** @type {string} */
  export let id = undefined

  /** @type {Ingredient} */
  $: ingredient = $receptoStore.ingredients.find(ingredient => ingredient.id === id)
  $: recipes = $receptoStore.recipes.filter(recipe => {
    return recipe.ingredients.some(_ => _.id === id)
  })
  $: recipesToMakeIt = ingredient.recipes.map(recipe => {
    return $receptoStore.recipes.find(_ => _.id === recipe)
  })

  function handleOnDelete() {
    const confirmed = confirm("Do you really want to delete this ingredient ?")
    if (confirmed) {
      receptoStore.deleteIngredient(id)
    }
  }
</script>

{#if ingredient}
  <h1>{ingredient.name}</h1>

  <p>{ingredient.description}</p>

  {#if ingredient.preservations}
    <h2>Preservation</h2>

    {#each ingredient.preservations as preservation}
      <h3>{preservation.name} <small>{ preservation.duration }</small></h3>

      <p>
        {preservation.description}
      </p>
    {/each}
  {/if}

  <Link to={`/ingredient/${ingredient.id}/update`}>Modify</Link>

  <button on:click={handleOnDelete}>Delete</button>

  {#if recipesToMakeIt && recipesToMakeIt.length > 0}
    <h2>How to make it?</h2>

    <ul>
      {#each recipesToMakeIt as recipe}
        <li>
          <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
        </li>
      {/each}
    </ul>
  {/if}

  {#if recipes && recipes.length > 0}
    <h2>Recipes</h2>

    {#each recipes as recipe}
      <li>
        <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
      </li>
    {/each}
  {/if}
{:else}
  <h1>Not found</h1>
{/if}