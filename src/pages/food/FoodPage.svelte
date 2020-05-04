<script>
  import i18n from "~/i18n"
  import { beforeUpdate, onMount } from "svelte"
  import cloneDeep from "lodash/cloneDeep"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty, replaceAt } from "~/utils/arrays"
  import { deleteFood, getUsedFor, getFood } from "./FoodPage"

  import Button from "~/components/buttons/Button.svelte"
  import Grid from "~/components/layout/Grid.svelte"
  import RecipeCard from "~/components/card/RecipeCard.svelte"
  import Page from "~/components/Page.svelte"
  import TwoColumns from "~/components/layout/TwoColumns.svelte"
  import Collapsable from "~/components/collapsable/Collapsable.svelte"
  import SectionView from "./section/SectionView.svelte"
  import UpdatableSection from "~/components/updatable/UpdatableSection.svelte"
  import PrimaryInformationSection from "./primaryInformation/PrimaryInformationSection.svelte"
  import PrimaryInformationForm from "./primaryInformation/PrimaryInformationForm.svelte"
  import SectionForm from "./section/SectionForm.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {Food} */
  let foodForm

  let food
  $: food = getFood($receptoStore, id)
  let usedFor
  $: usedFor = getUsedFor($receptoStore, id)

  onMount(() => resetForm())
  beforeUpdate(() => {
    if (food !== undefined && food.id !== id) {
      resetForm()
    }
  })

  function resetForm() {
    foodForm = cloneDeep(food)
  }

  function savePrimaryInformation() {
    receptoStore.updateFood(foodForm)
  }

  function cancelPrimaryInformation() {
    foodForm = {
      ...foodForm,
      name: food.name,
      category: food.category,
    }
  }

  function saveSection(index) {
    receptoStore.updateFoodSection(id, index, cloneDeep(foodForm.sections[index]))
  }

  function cancelSection(index) {
    foodForm = {
      ...foodForm,
      sections: replaceAt(foodForm.sections, index, () => cloneDeep(food.sections[index]))
    }
  }
</script>

<style>
  .delete-button {
    margin-top: 16px;
  }
</style>

<Page>
  {#if food}
    <TwoColumns gap="16px">
      <div>
        <UpdatableSection on:save={savePrimaryInformation} on:cancel={cancelPrimaryInformation}>
          <div slot="view">
            <PrimaryInformationSection food={food}/>
          </div>

          <div slot="edit">
            <PrimaryInformationForm bind:food={foodForm}/>
          </div>
        </UpdatableSection>

        {#each food.sections as section, index}
          <UpdatableSection on:save={() => saveSection(index)} on:cancel={() => cancelSection(index)}>
            <div slot="view">
              <SectionView section={section}/>
            </div>

            <div slot="edit">
              <SectionForm
                bind:section={foodForm.sections[index]}
                id={`food-section-${index}`}
                name={`section[${index}]`}
              />
            </div>
          </UpdatableSection>
        {/each}

        {#if nonEmpty(usedFor)}
          <h2>{$i18n.t("pages.food.page.usedFor")}</h2>

          <Grid>
            {#each usedFor as info}
              <RecipeCard recipe={info.recipe} food={info.food}/>
            {/each}
          </Grid>
        {/if}

        <div class="delete-button">
          <Button danger on:click={() => deleteFood(id, $i18n)}>{$i18n.t("pages.food.page.actions.delete")}</Button>
        </div>
      </div>

      <aside>
        {#each $receptoStore.searches as search}
          <Collapsable summary={$i18n.t("pages.food.page.asideSearch", { sitename: search.sitename })}>
            <iframe src={search.url.replace("{s}", food.name)}
                    title={$i18n.t("pages.food.page.asideSearch", { sitename: search.sitename })}
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