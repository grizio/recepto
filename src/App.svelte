<script>
  import Menu from "./Menu.svelte"
  import { Router, Route } from "svelte-routing"

  import RecipePage from "./pages/recipe/RecipePage.svelte"
  import CreateRecipePage from "./pages/recipe/CreateRecipePage.svelte"
  import UpdateRecipePage from "./pages/recipe/UpdateRecipePage.svelte"

  import IngredientPage from "./pages/ingredient/IngredientPage.svelte"
  import CreateIngredientPage from "./pages/ingredient/CreateIngredientPage.svelte"
  import UpdateIngredientPage from "./pages/ingredient/UpdateIngredientPage.svelte"

  import HomePage from "./pages/home/HomePage.svelte"

  export let url = "";
</script>

<style>
  .layout {
    display: flex;
  }

  .left-menu {
    flex-basis: 200px;
  }

  main {
    flex-grow: 1;
  }
</style>

<Router url={url}>
  <div class="layout">
    <div class="left-menu">
      <Menu/>
    </div>

    <main>
      <Route path="/recipe/:id/update" component={UpdateRecipePage}/>
      <Route path="/recipe/:id" component={RecipePage}/>
      <Route path="/recipe" component={CreateRecipePage}/>

      <Route path="/ingredient/:id/update" component={UpdateIngredientPage}/>
      <Route path="/ingredient/:id" component={IngredientPage}/>
      <Route path="/ingredient" component={CreateIngredientPage}/>

      <Route path="/" component={HomePage}/>
    </main>
  </div>
</Router>