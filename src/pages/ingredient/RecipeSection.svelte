<script>
  import receptoStore from "../../store/ReceptoStore"
  import i18n from "../../i18n"
  import { splitParagraphs } from "../../utils/strings"

  import TwoColumns from "../../components/layout/TwoColumns.svelte"

  /** @type {FullRecipe} */
  export let recipe
</script>

<style>
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

  .infos {
    display: grid;
    grid-template-columns: repeat(2, 200px);
    grid-column-gap: 8px;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .left {
    border-right: 1px solid #f0f0f0;
  }

  .recipe {
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
</style>

<h3>{recipe.name}</h3>

<div class="infos">
  <span>&#x1F465 {$i18n.t("pages.ingredient.page.recipes.plates", {count: recipe.plates})}</span>
  <span>&#x23F2 {$i18n.t("common.duration.short.text", {count: recipe.duration})}</span>
</div>

<section class="recipe">
  <TwoColumns className="" gap="8px" columns="300px 1fr">
    <div class="left">
      <h4>{$i18n.t("pages.ingredient.page.recipes.ingredients")}</h4>

      <ul>
        {#each recipe.ingredients as ingredient}
          <li>
            {ingredient.quantity} {ingredient.unit}
            <a href={`/ingredient/${ingredient.id}`}>{ingredient.ref.name}</a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="right">
      <h4>{$i18n.t("pages.ingredient.page.recipes.steps")}</h4>

      <ol class="steps">
        {#each splitParagraphs(recipe.steps) as step}
          <li>{step}</li>
        {/each}
      </ol>
    </div>
  </TwoColumns>
</section>