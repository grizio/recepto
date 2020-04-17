<script>
  import receptoStore from "./store/ReceptoStore"
  import { Link } from "svelte-routing"
  import { sortBy } from "./utils/arrays"

  $: sortedRecipes = sortBy($receptoStore.recipes, _ => _.name)
  $: sortedIngredients = sortBy($receptoStore.ingredients, _ => _.name)
</script>

<style>
  nav {
    overflow: auto;
  }
</style>

<nav>
  <Link to="/">Recepto</Link>

  <h2>Recipes</h2>

  <ul>
    {#each sortedRecipes as recipe}
      <li>
        <Link to={`/recipe/${recipe.id}`}>
          {recipe.name}
        </Link>
      </li>
    {/each}
  </ul>

  <Link to="/recipe">Create new</Link>

  <h2>Ingredients</h2>

  <ul>
    {#each sortedIngredients as ingredient}
      <li>
        <Link to={`/ingredient/${ingredient.id}`}>
          {ingredient.name}
        </Link>
      </li>
    {/each}
  </ul>

  <Link to="/ingredient">Create new</Link>
</nav>
