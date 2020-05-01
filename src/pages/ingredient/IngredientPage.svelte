<script>
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import searchStore from "../../store/SearchStore"
  import { nonEmpty } from "../../utils/arrays"
  import { buildFullIngredient, deleteIngredient } from "./IngredientPage"

  import Button from "../../components/buttons/Button.svelte"
  import Grid from "../../components/layout/Grid.svelte"
  import Card from "../../components/card/Card.svelte";
  import RecipeCard from "../../components/card/RecipeCard.svelte"
  import Page from "../../components/Page.svelte"
  import TwoColumns from "../../components/layout/TwoColumns.svelte"
  import Collapsable from "../../components/collapsable/Collapsable.svelte"
  import MarkdownText from "../../components/text/MarkdownText.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {Ingredient} */
  let ingredient
  $: ingredient = buildFullIngredient($receptoStore, id)
</script>

<Page>
  {#if ingredient}
    <TwoColumns>
      <div>
        <h1>{ingredient.name}</h1>

        <div>
          <Button
            href={`/ingredient/${ingredient.id}/update`}>{$i18n.t("pages.ingredient.page.actions.modify")}</Button>
          <Button danger on:click={() => deleteIngredient(id, $i18n)}>{$i18n.t("pages.ingredient.page.actions.delete")}</Button>
        </div>

        <MarkdownText value={ingredient.description} />

        {#if nonEmpty(ingredient.preservations)}
          <h2>{$i18n.t("pages.ingredient.page.preservations")}</h2>

          {#each ingredient.preservations as preservation}
            <h3>{preservation.name} ({ preservation.duration })</h3>

            <MarkdownText value={preservation.description} />
          {/each}
        {/if}

        {#if nonEmpty(ingredient.preparations)}
          <h2>{$i18n.t("pages.ingredient.page.preparations")}</h2>

          {#each ingredient.preparations as preparation}
            <h3>{preparation.name}</h3>

            <MarkdownText value={preparation.description} />
          {/each}
        {/if}

        {#if nonEmpty(ingredient.replacements)}
          <h2>{$i18n.t("pages.ingredient.page.replacements")}</h2>

          {#each ingredient.replacements as replacement}
            <h3>{replacement.ingredient.name}</h3>

            <MarkdownText value={replacement.description} />
          {/each}
        {/if}

        {#if nonEmpty(ingredient.recipesDIY)}
          <h2>{$i18n.t("pages.ingredient.page.diy")}</h2>

          <Grid>
            {#each ingredient.recipesDIY as recipe}
              <RecipeCard recipe={recipe}/>
            {/each}
          </Grid>
        {/if}

        {#if nonEmpty(ingredient.recipes)}
          <h2>{$i18n.t("pages.ingredient.page.recipes")}</h2>

          <Grid>
            {#each ingredient.recipes as recipe}
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