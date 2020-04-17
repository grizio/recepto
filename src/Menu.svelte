<script>
  import { Link } from "svelte-routing"
  import i18n from "./i18n"
  import receptoStore from "./store/ReceptoStore"
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
  <Link to="/">{$i18n.t("menu.appName")}</Link>

  <h2>{$i18n.t("menu.recipes")}</h2>

  <ul>
    {#each sortedRecipes as recipe}
      <li>
        <Link to={`/recipe/${recipe.id}`}>
          {recipe.name}
        </Link>
      </li>
    {/each}
  </ul>

  <Link to="/recipe">{$i18n.t("menu.newRecipe")}</Link>

  <h2>{$i18n.t("menu.ingredients")}</h2>

  <ul>
    {#each sortedIngredients as ingredient}
      <li>
        <Link to={`/ingredient/${ingredient.id}`}>
          {ingredient.name}
        </Link>
      </li>
    {/each}
  </ul>

  <Link to="/ingredient">{$i18n.t("menu.newIngredient")}</Link>
</nav>
