<script>
  import Menu from "./Menu.svelte"
  import { Router, Route, links } from "svelte-routing"

  import RecipePage from "./pages/recipe/RecipePage.svelte"
  import CreateRecipePage from "./pages/recipe/CreateRecipePage.svelte"
  import UpdateRecipePage from "./pages/recipe/UpdateRecipePage.svelte"

  import CategoriesPage from "./pages/categories/CategoriesPage.svelte"

  import IngredientPage from "./pages/ingredient/IngredientPage.svelte"
  import CreateIngredientPage from "./pages/ingredient/CreateIngredientPage.svelte"
  import UpdateIngredientPage from "./pages/ingredient/UpdateIngredientPage.svelte"

  import HomePage from "./pages/home/HomePage.svelte"
  import TwoColumns from "./components/layout/TwoColumns.svelte"

  export let url = "";
</script>

<style>
  main {
    height: 100vh;
    overflow-y: auto;
    padding: 16px;
  }

  .space {
    height: 16px;
  }
</style>

<div use:links>
  <Router url={url}>
    <TwoColumns columns="300px auto">
      <Menu/>

      <main>
        <Route path="/recipe/:id/update" component={UpdateRecipePage}/>
        <Route path="/recipe/:id" component={RecipePage}/>
        <Route path="/recipe" component={CreateRecipePage}/>

        <Route path="/categories" component={CategoriesPage}/>

        <Route path="/ingredient/:id/update" component={UpdateIngredientPage}/>
        <Route path="/ingredient/:id" component={IngredientPage}/>
        <Route path="/ingredient" component={CreateIngredientPage}/>

        <Route path="/" component={HomePage}/>

        <div class="space"></div>
      </main>
    </TwoColumns>
  </Router>
</div>