<script>
  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  import receptoStore from "~/store/ReceptoStore"
  import TwoColumns from "../layout/TwoColumns.svelte"
  import { getActiveCategoryId, getActiveFoodId, getCategories, getFoodsFromCategory } from "./Menu"
  import AddCategory from "./AddCategory.svelte"
  import AddFood from "./AddFood.svelte"
  import MenuList from "./MenuList.svelte"

  const { activeRoute } = getContext(ROUTER)

  let activeCategoryId, activeFoodId, menuCategories, menuFoods
  $: activeCategoryId = getActiveCategoryId($activeRoute)
  $: activeFoodId = getActiveFoodId($activeRoute)
  $: menuCategories = getCategories($receptoStore, activeCategoryId)
  $: menuFoods = getFoodsFromCategory($receptoStore, activeCategoryId, activeFoodId)
</script>

<style>
  .menu-column {
    height: var(--menu-height);
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .menu-column:first-of-type {
    border-right: 1px solid var(--gray-6);
  }
</style>

<TwoColumns columns="1fr 1fr">
  <div class="menu-column">
    <MenuList items={menuCategories} />

    <AddCategory/>
  </div>

  <div class="menu-column">
    <MenuList items={menuFoods} />

    {#if activeCategoryId !== undefined}
      <AddFood categoryId={activeCategoryId}/>
    {/if}
  </div>
</TwoColumns>