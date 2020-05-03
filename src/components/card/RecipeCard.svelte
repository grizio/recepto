<script>
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty } from "~/utils/arrays"
  import { normalizeRecipe } from "./RecipeCard"

  import Card from "./Card.svelte"

  /** @type {Food} */
  export let food

  /** @type {Recipe} */
  export let recipe

  /** @type {NormalizedRecipe} */
  let normalizedRecipe
  $: normalizedRecipe = normalizeRecipe($receptoStore, recipe)
</script>

<Card title={`${food.name} (${normalizedRecipe.name})`} href={`/food/${food.id}`}>
  <p>&#x1F465 {$i18n.t("components.card.recipe.plates", {count: recipe.plates})}</p>
  <p>&#x23F2 {$i18n.t("common.duration.short.text", {count: normalizedRecipe.duration})}</p>
  {#if food.description}
    <p class="ellipsis">
      &#x1F4DD {food.description}
    </p>
  {/if}
  {#if nonEmpty(normalizedRecipe.ingredients)}
    <p class="ellipsis">
      &#x1F96C {normalizedRecipe.ingredients.join(", ")}
    </p>
  {/if}
</Card>