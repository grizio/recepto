<script>
  import { derived } from "svelte/store"
  import { Link } from "svelte-routing"
  import receptoStore from "../../store/ReceptoStore"
  import searchStore from "../../store/SearchStore"
  import TwoColumns from "../../components/layout/TwoColumns.svelte"
  import i18n from "../../i18n"
  import { splitParagraphs } from "../../utils/strings"
  import Button from "../../components/buttons/Button.svelte"
  import Page from "../../components/Page.svelte"
  import Collapsable from "../../components/collapsable/Collapsable.svelte"

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

<Page>
  {#if recipe}
    <h1>{recipe.name}</h1>

    <div>
      <Button href={`/recipe/${recipe.id}/update`}>{$i18n.t("pages.recipe.page.actions.modify")}</Button>
      <Button danger on:click={handleOnDelete}>{$i18n.t("pages.recipe.page.actions.delete")}</Button>
    </div>

    <div class="infos">
      <span>&#x1F465 {$i18n.t("pages.recipe.page.plates", {count: recipe.plates})}</span>
      <span>&#x23F2 {$i18n.t("common.minutes", {count: recipe.duration})}</span>
    </div>

    <section class="recipe">
      <TwoColumns className="" gap="8px" columns="300px 1fr">
        <div class="left">
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
        </div>
      </TwoColumns>
    </section>

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

    <aside>
      <h2>{$i18n.t("pages.recipe.page.asideTitle")}</h2>

      {#each $searchStore as search}
        <Collapsable summary={$i18n.t("pages.recipe.page.asideSearch", { sitename: search.sitename })}>
          <iframe src={search.url(recipe.name)}
                  width="100%"
                  height="500px"></iframe>
        </Collapsable>
      {/each}
    </aside>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>