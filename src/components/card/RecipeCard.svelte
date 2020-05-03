<script>
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { nonEmpty } from "../../utils/arrays"
  import { normalizeRecipe } from "./RecipeCard"

  import Card from "./Card.svelte"

  /** @type {Ingredient} */
  export let ingredient

  /** @type {Recipe} */
  export let recipe

  /** @type {NormalizedRecipe} */
  let normalizedRecipe
  $: normalizedRecipe = normalizeRecipe($receptoStore, recipe)
</script>

<Card title={`${ingredient.name} (${normalizedRecipe.name})`} href={`/ingredient/${ingredient.id}`}>
  <p>&#x1F465 {$i18n.t("pages.recipe.page.plates", {count: recipe.plates})}</p>
  <p>&#x23F2 {$i18n.t("common.duration.short.text", {count: normalizedRecipe.duration})}</p>
  {#if ingredient.description}
    <p class="ellipsis">
      &#x1F4DD {ingredient.description}
    </p>
  {/if}
  {#if nonEmpty(normalizedRecipe.ingredients)}
    <p class="ellipsis">
      &#x1F96C {normalizedRecipe.ingredients.join(", ")}
    </p>
  {/if}
</Card>