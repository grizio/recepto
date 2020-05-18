<script>
  import { getContext } from "svelte"
  import { ROUTER } from "svelte-routing/src/contexts"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import TwoColumns from "../layout/TwoColumns.svelte"
  import { getActiveCategoryId, getActiveFoodId, getCategories, getFoodsFromCategory } from "./Menu"
  import AddCategory from "./AddCategory.svelte"
  import AddFood from "./AddFood.svelte"

  const { activeRoute } = getContext(ROUTER)

  let activeCategoryId, activeFoodId, categories, foods
  $: activeCategoryId = getActiveCategoryId($activeRoute)
  $: activeFoodId = getActiveFoodId($activeRoute)
  $: categories = getCategories($receptoStore)
  $: foods = getFoodsFromCategory($receptoStore, activeCategoryId)
</script>

<style>
  nav {
    overflow: auto;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: 0 0 4px #323a46;
  }

  .sitename {
    background-color: #282e38;
    padding: 8px;
    display: block;
    font-size: 1.5rem;
    color: #f7f7f7;
    font-weight: 700;
    text-decoration: none;
    border-bottom: 1px solid #adb5bd;
  }

  .menu {
    height: calc(100vh - 46px);
    display: flex;
    align-items: stretch;
  }

  .menu-column {
    height: calc(100vh - 46px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .menu-column:first-of-type {
    border-right: 1px solid var(--gray-6);
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul > li > a {
    padding: 8px 16px;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: var(--gray-9);
  }

  ul > li:hover {
    background-color: var(--gray-5);
  }

  ul > li[aria-current=true], ul > li[aria-current=true] > a {
    background-color: var(--gray-9);
    color: var(--gray-1);
  }
</style>

<nav>
  <a href="/" class="sitename">{$i18n.t("menu.appName")}</a>

  <div class="menu">
    <TwoColumns columns="1fr 1fr">
      <div class="menu-column">
        <ul>
          {#each categories as category}
            <li aria-current={activeCategoryId === category.id}>
              <a href={`/category/${category.id}`}>
                {category.name}
              </a>
            </li>
          {/each}
        </ul>

        <AddCategory/>
      </div>

      <div class="menu-column">
        <ul>
          {#each foods as food}
            <li aria-current={activeFoodId === food.id}>
              <a href={`/category/${activeCategoryId}/food/${food.id}`}>
                {food.name}
              </a>
            </li>
          {/each}
        </ul>

        {#if activeCategoryId !== undefined}
          <AddFood categoryId={activeCategoryId}/>
        {/if}
      </div>
    </TwoColumns>
  </div>
</nav>
