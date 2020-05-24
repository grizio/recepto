<script>
  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  import receptoStore from "~/store/ReceptoStore"
  import { getActiveFoodId, searchFoods } from "./Menu"
  import MenuList from "./MenuList.svelte"

  const { activeRoute } = getContext(ROUTER)

  /** @type {string} */
  export let search

  let activeFoodId, foods
  $: activeFoodId = getActiveFoodId($activeRoute)
  $: foods = searchFoods($receptoStore, search, activeFoodId)
</script>

<style>
  .menu-column {
    width: 100%;
    height: var(--menu-height);
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>

<div class="menu-column">
  <MenuList items={foods} />
</div>