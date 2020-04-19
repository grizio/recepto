<script>
  import i18n from "../../i18n"
  import Card from "./Card.svelte"
  import receptoStore from "../../store/ReceptoStore"
  import {nonEmpty} from "../../utils/arrays"

  /** @type {Recipe} */
  export let recipe

  $: ingredients = recipe.ingredients
          .map(ingredient => $receptoStore.ingredients.find(_ => _.id === ingredient.id))
          .filter(_ => _ !== undefined)
          .map(_ => _.name)
</script>

<Card title={recipe.name} href={`/recipe/${recipe.id}`}>
  <p>&#x1F465 {$i18n.t("pages.recipe.page.plates", {count: recipe.plates})}</p>
  <p>&#x23F2 {$i18n.t("common.minutes", {count: recipe.preparationDuration + recipe.cookingDuration})}</p>
  {#if recipe.shortDescription}
    <p class="ellipsis">
      &#x1F4DD {recipe.shortDescription}
    </p>
  {/if}
  {#if nonEmpty(ingredients)}
    <p class="ellipsis">
      &#x1F96C {ingredients.join(", ")}
    </p>
  {/if}
</Card>