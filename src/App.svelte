<script>
  import Menu from "~/Menu.svelte"
  import { Router, Route, links } from "svelte-routing"

  import CategoriesPage from "~/pages/categories/CategoriesPage.svelte"

  import SearchesPage from "~/pages/searches/SearchesPage.svelte"

  import FoodPage from "~/pages/food/FoodPage.svelte"
  import CreateFoodPage from "~/pages/food/CreateFoodPage.svelte"

  import HomePage from "~/pages/home/HomePage.svelte"
  import TwoColumns from "~/components/layout/TwoColumns.svelte"

  export let url = ""
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
        <Route path="/categories" component={CategoriesPage}/>

        <Route path="/searches" component={SearchesPage}/>

        <Route path="/food/:id" component={FoodPage}/>
        <Route path="/food" component={CreateFoodPage}/>

        <Route path="/" component={HomePage}/>

        <div class="space"></div>
      </main>
    </TwoColumns>
  </Router>
</div>