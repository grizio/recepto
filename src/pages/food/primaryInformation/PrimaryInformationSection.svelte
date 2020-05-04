<script>
  import receptoStore from "~/store/ReceptoStore"
  import { getCategory } from "./PrimaryInformationSection"

  /** @type {Food} */
  export let food

  /** @type {Category | undefined} */
  let category
  $: category = getCategory($receptoStore, food.category)
</script>

<h1>{food.name}</h1>

{#if category}
  <p>{category.name}</p>
{/if}