<script>
  import PreservationSection from "../preservation/PreservationSection.svelte"
  import PreparationSection from "../preparation/PreparationSection.svelte"
  import RecipeSection from "../recipe/RecipeSection.svelte"
  import ReplacementSection from "../replacement/ReplacementSection.svelte"
  import DescriptionSection from "../description/DescriptionSection.svelte"

  /** @type {Section} */
  export let section
</script>

{#if section.type === "preservation"}
  <PreservationSection preservation={section}/>
{:else if section.type === "preparation"}
  <PreparationSection preparation={section}/>
{:else if section.type === "recipe"}
  <RecipeSection recipe={section}/>
{:else if section.type === "replacement"}
  <ReplacementSection replacement={section}/>
{:else if section.type === "description"}
  <DescriptionSection description={section}/>
{/if}