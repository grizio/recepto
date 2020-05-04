<script>
  import i18n from "~/i18n"
  import { buildSectionTypeOptions, buildSection } from "./SectionForm"
  import PreservationForm from "../preservation/PreservationForm.svelte"
  import PreparationForm from "../preparation/PreparationForm.svelte"
  import RecipeForm from "../recipe/RecipeForm.svelte"
  import ReplacementForm from "../replacement/ReplacementForm.svelte"
  import DescriptionForm from "../description/DescriptionForm.svelte"
  import Button from "../../../components/buttons/Button.svelte"

  /** @type {Section | undefined} */
  export let section = undefined
  /** @type Array<Option> */
  export let foodOptions
  /** @type {string} */
  export let id
  /** @type {string} */
  export let name

  let sectionTypeOptions = buildSectionTypeOptions($i18n)

  /**
   * @param {SectionType} sectionType
   */
  function createSection(sectionType) {
    section = buildSection(sectionType, foodOptions)
  }
</script>

<style>
  .choose {
    display: grid;
    grid-template-columns: repeat(5, 200px);
    gap: 24px;
    justify-content: center;
    margin-bottom: 30px;
  }
</style>

{#if section === undefined}
  <div class="choose">
    {#each sectionTypeOptions as option}
      <Button on:click={() => createSection(option.value)}>
        {option.label}
      </Button>
    {/each}
  </div>
{:else}
  {#if section.type === "preservation"}
    <PreservationForm preservation={section} id={id} name={name}/>
  {:else if section.type === "preparation"}
    <PreparationForm preparation={section} id={id} name={name}/>
  {:else if section.type === "recipe"}
    <RecipeForm recipe={section} id={id} name={name} foodOptions={foodOptions}/>
  {:else if section.type === "replacement"}
    <ReplacementForm replacement={section} id={id} name={name} foodOptions={foodOptions}/>
  {:else if section.type === "description"}
    <DescriptionForm description={section} id={id} name={name}/>
  {/if}
{/if}