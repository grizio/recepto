<script>
  import i18n from "./i18n"
  import receptoStore from "./store/ReceptoStore"
  import { getIngredientsByCategory } from "./models/Category";

  let sortedCategories
  $: sortedCategories = getIngredientsByCategory($receptoStore, $i18n)
</script>

<style>
  nav {
    overflow: auto;
    height: 100vh;
    background-color: #282e38;
    box-shadow: 0 0 4px #323a46;
  }

  .sitename {
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

  h2, h3 {
    color: #f7f7f7;
    margin: 8px 0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul > li > a {
    display: block;
    color: #adb5bd;
    text-decoration: none;
    transition: color ease-in-out 120ms;
    padding: 8px 0;
  }

  ul > li > a:hover {
    color: #f9c851;
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
    <h2>{$i18n.t("menu.ingredients")}</h2>

    <a href="/categories" class="button">{$i18n.t("menu.updateCategories")}</a>

    {#each sortedCategories as category}
      <h3>{category.name}</h3>

      <ul>
        {#each category.ingredients as ingredient}
          <li>
            <a href={`/ingredient/${ingredient.id}`}>
              {ingredient.name}
            </a>
          </li>
        {/each}
      </ul>
    {/each}

    <a href="/ingredient" class="add-button">{$i18n.t("menu.newIngredient")}</a>
  </div>
</nav>
