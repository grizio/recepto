<script>
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import TwoColumns from "../layout/TwoColumns.svelte"
  import { getCategories, getFoodsFromCategory } from "./Menu"
  import { onMount } from "svelte"
  import Button from "../buttons/Button.svelte"
  import UpdatableSection from "../updatable/UpdatableSection.svelte"
  import AddCategory from "./AddCategory.svelte"

  let activeCategory

  let categories, foods
  $: categories = getCategories($receptoStore)
  $: foods = getFoodsFromCategory($receptoStore, activeCategory)

  onMount(() => {
    selectCategory(categories[0])
  })

  function selectCategory(category) {
    activeCategory = category
  }
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

  .section {
    padding: 8px;
    margin-top: 20px;
  }

  .menu {
    border-top: 1px solid var(--gray-6);
    border-bottom: 1px solid var(--gray-6);
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

  .button, .add-button {
    display: block;
    margin-top: 8px;
    color: #f9c851;
  }

  .add-button:before {
    content: "+ ";
  }
</style>

<nav>
  <a href="/" class="sitename">{$i18n.t("menu.appName")}</a>

  <div class="section">
    <a href="/units" class="button">{$i18n.t("menu.units")}</a>
    <a href="/searches" class="button">{$i18n.t("menu.searches")}</a>
  </div>

  <div class="menu">
    <TwoColumns columns="1fr 1fr">
      <div class="menu-column">
        <ul>
          {#each categories as category}
            <li on:click={() => selectCategory(category)}
                aria-current={activeCategory === category}>
              <a href={`/category/${category.id}`}>
                {category.name}
              </a>
            </li>
          {/each}
        </ul>

        <AddCategory />
      </div>

      <div class="menu-column">
        <ul>
          {#each foods as food}
            <li>
              <a href={`/food/${food.id}`}>
                {food.name}
              </a>
            </li>
          {/each}
        </ul>

        <a href="/food" class="add-button">{$i18n.t("menu.newFood")}</a>
      </div>
    </TwoColumns>
  </div>
</nav>
