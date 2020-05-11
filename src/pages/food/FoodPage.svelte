<script>
  import i18n from "~/i18n"
  import { beforeUpdate, onMount } from "svelte"
  import cloneDeep from "lodash/cloneDeep"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty, replaceAt } from "~/utils/arrays"
  import {
    deleteFood,
    getUsedFor,
    getFood,
    getSectionInfos,
    addSectionInfo,
    persistSection,
    resetSection,
    deleteSection
  } from "./FoodPage"

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

  /** @type {Array<SectionInfo>} */
  let sections = []

  let food
  $: food = getFood($receptoStore, id)
  let usedFor
  $: usedFor = getUsedFor($receptoStore, id)
  let hasUnsavedAddedSection
  $: hasUnsavedAddedSection = sections.some(_ => _.initial === undefined)

  onMount(() => resetForm())
  beforeUpdate(() => {
    if (food !== undefined && food.id !== id) {
      resetForm()
    }
  })

  function resetForm() {
    sections = getSectionInfos(food)
  }

  function savePrimaryInformation() {
    receptoStore.updateFood({
      ...food,
      name: foodForm.name,
      category: foodForm.category,
    })
  }

  function cancelPrimaryInformation() {
    foodForm = {
      ...foodForm,
      name: food.name,
      category: food.category,
    }
  }

  function addSection() {
    sections = addSectionInfo(sections)
  }

  function saveSection(index) {
    sections = persistSection(id, sections, index)
  }

  function cancelSection(index) {
    sections = resetSection(sections, index)
  }

  function removeSection(index) {
    sections = deleteSection(id, sections, index, $i18n)
  }
</script>

<style>
  section, aside, .actions {
    margin-bottom: 16px;
  }
</style>

<Page>
  {#if food}
    <UpdatableSection on:save={savePrimaryInformation} on:cancel={cancelPrimaryInformation}>
      <div slot="view">
        <PrimaryInformationSection food={food}/>
      </div>

      <div slot="edit">
        <PrimaryInformationForm bind:food={foodForm}/>
      </div>
    </UpdatableSection>

    {#each sections as section, index}
      <section>
        <UpdatableSection
          initialState={section.initial === undefined ? "edit" : "view"}
          on:save={() => saveSection(index)}
          on:cancel={() => cancelSection(index)}
        >
          <div slot="view">
            <SectionView section={section.initial}/>
          </div>

          <div slot="edit">
            <SectionForm
              bind:section={sections[index].editing}
              id={`food-section-${index}`}
              name={`section[${index}]`}
            />
          </div>

          <span slot="actions">
            <Button danger on:click={() => removeSection(index)}>
              &#x1F5D1 {$i18n.t("pages.food.page.actions.removeSection")}
            </Button>
          </span>
        </UpdatableSection>
      </section>
    {/each}

    {#if !hasUnsavedAddedSection}
      <div class="actions">
        <Button type="primary" on:click={addSection}>{$i18n.t("pages.food.page.actions.addSection")}</Button>
      </div>
    {/if}

    {#if nonEmpty(usedFor)}
      <section>
        <h2>{$i18n.t("pages.food.page.usedFor")}</h2>

        <Grid>
          {#each usedFor as info}
            <RecipeCard recipe={info.recipe} food={info.food}/>
          {/each}
        </Grid>
      </section>
    {/if}

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

    <div class="actions">
      <Button danger on:click={() => deleteFood(id, $i18n)}>{$i18n.t("pages.food.page.actions.delete")}</Button>
    </div>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>