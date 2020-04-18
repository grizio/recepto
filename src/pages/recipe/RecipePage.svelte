<script>
  import { derived } from "svelte/store"
  import { Link } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import TwoColumns from "../../components/layout/TwoColumns.svelte"
  import i18n from "../../i18n"
  import { splitParagraphs } from "../../utils/strings"

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

<style>
  .duration {
    display: grid;
    align-items: center;
    grid-template-areas: "total preparation" "total cooking";
  }

  .steps {
    counter-reset: steps;
    list-style-type: none;
    padding-left: 50px;
  }
  .steps > li {
    counter-increment: steps;
    margin: 0 0 24px 0;
    position: relative;
  }
  .steps > li:before {
    content: counter(steps);
    border-radius: 50%;
    background-color: #e6eaed;
    --size: 32px;
    position: absolute;
    left: calc(-1 * var(--size) - 16px);
    width: var(--size);
    height: var(--size);
    line-height: var(--size);
    text-align: center;
  }
</style>

{#if recipe}
  <h1>{recipe.name}</h1>

  <TwoColumns gap="8px" columns="250px 1fr">
    <div class="left">
      &#x1F465 {$i18n.t("pages.recipe.page.plates", {count: recipe.plates})}

      <div class="duration">
        <span
          style="grid-area: total">&#x23F2 {$i18n.t("common.minutes", {count: recipe.preparationDuration + recipe.cookingDuration})}</span>
        <span
          style="grid-area: preparation">&#x1F52A {$i18n.t("common.minutes", {count: recipe.preparationDuration})}</span>
        <span style="grid-area: cooking">&#x1F373 {$i18n.t("common.minutes", {count: recipe.cookingDuration})}</span>
      </div>

      <h2>{$i18n.t("pages.recipe.page.ingredients")}</h2>

      <ul>
        {#each ingredients as ingredient}
          <li>
            {ingredient.quantity} {ingredient.unit}
            <Link to={`/ingredient/${ingredient.id}`}>{ingredient.ref.name}</Link>
          </li>
        {/each}
      </ul>
    </div>

    <div class="right">
      <h2>{$i18n.t("pages.recipe.page.steps")}</h2>

      <ol class="steps">
        {#each splitParagraphs(recipe.steps) as step}
          <li>{step}</li>
        {/each}
      </ol>

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
    </div>
  </TwoColumns>

  <Link to={`/recipe/${recipe.id}/update`}>{$i18n.t("pages.recipe.page.actions.modify")}</Link>

  <button on:click={handleOnDelete}>{$i18n.t("pages.recipe.page.actions.delete")}</button>
{:else}
  <h1>{$i18n.t("common.notFound")}</h1>
{/if}