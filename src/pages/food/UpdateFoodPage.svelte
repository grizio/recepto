<script>
  import { onMount } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import { getFood, updateFood } from "./UpdateFoodPage"

  import FoodForm from "./FoodForm.svelte"
  import Page from "~/components/Page.svelte"

  /** @type {string} */
  export let id = undefined

  /** @type {Food} */
  let food
  /** @type {string} */
  let initialName

  onMount(() => {
    food = getFood($receptoStore, id)
    initialName = food ? food.name : undefined
  })
</script>

<Page>
  {#if food}
    <h1>{$i18n.t("pages.food.update.title", {food: initialName})}</h1>

    <FoodForm bind:food on:submit={() => updateFood(food)}/>
  {:else}
    <h1>{$i18n.t("common.notFound")}</h1>
  {/if}
</Page>