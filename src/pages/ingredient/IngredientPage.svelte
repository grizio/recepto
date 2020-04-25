<script>
  import {derived} from "svelte/store"
  import {navigate} from "svelte-routing"
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import searchStore from "../../store/SearchStore"
  import Button from "../../components/buttons/Button.svelte"
  import {nonEmpty} from "../../utils/arrays"
  import Grid from "../../components/layout/Grid.svelte"
  import Card from "../../components/card/Card.svelte";
  import RecipeCard from "../../components/card/RecipeCard.svelte"
  import Page from "../../components/Page.svelte"
  import TwoColumns from "../../components/layout/TwoColumns.svelte"
  import Collapsable from "../../components/collapsable/Collapsable.svelte"
  import { onDefined } from "../../utils/values"

  /** @type {string} */
  export let id = undefined

  /** @type {Ingredient} */
  $: ingredient = $receptoStore.ingredients.find(ingredient => ingredient.id === id)
  $: recipes = $receptoStore.recipes.filter(recipe => {
    return recipe.ingredients.some(_ => _.id === id)
  })
  $: recipesDIY = onDefined(ingredient, ingredient => ingredient.recipes.map(recipe => {
    return $receptoStore.recipes.find(_ => _.id === recipe)
  }))

  function handleOnDelete() {
    const confirmed = confirm($i18n.t("pages.ingredient.page.actions.confirmDelete"))
    if (confirmed) {
      navigate(`/`)
      receptoStore.deleteIngredient(id)
    }
  }
</script>

<Page>
  {#if ingredient}
    <TwoColumns>
      <div>
        <h1>{ingredient.name}</h1>

        <div>
          <Button
            href={`/ingredient/${ingredient.id}/update`}>{$i18n.t("pages.ingredient.page.actions.modify")}</Button>
          <Button danger on:click={handleOnDelete}>{$i18n.t("pages.ingredient.page.actions.delete")}</Button>
        </div>

        <p>{ingredient.description}</p>

        {#if nonEmpty(ingredient.preservations)}
          <h2>{$i18n.t("pages.ingredient.page.preservations")}</h2>

          {#each ingredient.preservations as preservation}
            <h3>{preservation.name} ({ preservation.duration })</h3>

            <p>
              {preservation.description}
            </p>
          {/each}
        {/if}

        {#if nonEmpty(ingredient.preparations)}
          <h2>{$i18n.t("pages.ingredient.page.preparations")}</h2>

          {#each ingredient.preparations as preparation}
            <h3>{preparation.name}</h3>

            <p>
              {preparation.description}
            </p>
          {/each}
        {/if}

        {#if nonEmpty(recipesDIY)}
          <h2>{$i18n.t("pages.ingredient.page.diy")}</h2>

          <Grid>
            {#each recipesDIY as recipe}
              <RecipeCard recipe={recipe}/>
            {/each}
          </Grid>
        {/if}

        {#if nonEmpty(recipes)}
          <h2>{$i18n.t("pages.ingredient.page.recipes")}</h2>

          <Grid>
            {#each recipes as recipe}
              <RecipeCard recipe={recipe}/>
            {/each}
          </Grid>
        {/if}
      </div>

      <aside>
        {#each $searchStore as search}
          <Collapsable summary={$i18n.t("pages.ingredient.page.asideSearch", { sitename: search.sitename })}>
            <iframe src={search.url(ingredient.name)}
                    width="100%"
                    height="500px"></iframe>
          </Collapsable>
        {/each}
      </aside>
    </TwoColumns>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>