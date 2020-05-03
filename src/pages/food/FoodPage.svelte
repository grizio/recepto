<script>
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import searchStore from "~/store/SearchStore"
  import { nonEmpty } from "~/utils/arrays"
  import { buildFullFood, deleteFood } from "./FoodPage"

  import Button from "~/components/buttons/Button.svelte"
  import Grid from "~/components/layout/Grid.svelte"
  import RecipeCard from "~/components/card/RecipeCard.svelte"
  import Page from "~/components/Page.svelte"
  import TwoColumns from "~/components/layout/TwoColumns.svelte"
  import Collapsable from "~/components/collapsable/Collapsable.svelte"
  import MarkdownText from "~/components/text/MarkdownText.svelte"
  import RecipeSection from "./recipe/RecipeSection.svelte"
  import PreservationSection from "./preservation/PreservationSection.svelte"
  import PreparationSection from "./preparation/PreparationSection.svelte"
  import ReplacementSection from "./replacement/ReplacementSection.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {FullFood} */
  let food
  $: food = buildFullFood($receptoStore, id)
</script>

<Page>
  {#if food}
    <TwoColumns>
      <div>
        <h1>{food.name}</h1>

        <div>
          <Button
            href={`/food/${food.id}/update`}>{$i18n.t("pages.food.page.actions.modify")}</Button>
          <Button danger on:click={() => deleteFood(id, $i18n)}>{$i18n.t("pages.food.page.actions.delete")}</Button>
        </div>

        <MarkdownText value={food.description}/>

        {#if nonEmpty(food.preservations)}
          <h2>{$i18n.t("pages.food.page.preservations")}</h2>

          {#each food.preservations as preservation}
            <PreservationSection preservation={preservation}/>
          {/each}
        {/if}

        {#if nonEmpty(food.preparations)}
          <h2>{$i18n.t("pages.food.page.preparations")}</h2>

          {#each food.preparations as preparation}
            <PreparationSection preparation={preparation}/>
          {/each}
        {/if}

        {#if nonEmpty(food.replacements)}
          <h2>{$i18n.t("pages.food.page.replacements")}</h2>

          {#each food.replacements as replacement}
            <ReplacementSection replacement={replacement} />
          {/each}
        {/if}

        {#if nonEmpty(food.recipes)}
          <h2>{$i18n.t("pages.food.page.recipes.title")}</h2>

          {#each food.recipes as recipe}
            <RecipeSection recipe={recipe}/>
          {/each}
        {/if}

        {#if nonEmpty(food.usedFor)}
          <h2>{$i18n.t("pages.food.page.usedFor")}</h2>

          <Grid>
            {#each food.usedFor as info}
              <RecipeCard recipe={info.recipe} food={info.food}/>
            {/each}
          </Grid>
        {/if}
      </div>

      <aside>
        {#each $searchStore as search}
          <Collapsable summary={$i18n.t("pages.food.page.asideSearch", { sitename: search.sitename })}>
            <iframe src={search.url(food.name)}
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