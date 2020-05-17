<script>
  import Menu from "~/components/menu/Menu.svelte"
  import { Router, Route, links } from "svelte-routing"

  import UnitsPage from "~/pages/units/UnitsPage.svelte"

  import SearchesPage from "~/pages/searches/SearchesPage.svelte"

  import CategoryPage from "~/pages/category/CategoryPage.svelte"

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
    <TwoColumns columns="500px auto">
      <Menu/>

      <main>
        <Route path="/units" component={UnitsPage}/>

        <Route path="/searches" component={SearchesPage}/>


        <Route path="/category/:categoryId/food/:foodId" component={FoodPage}/>
        <Route path="/category/:categoryId/food" component={CreateFoodPage}/>
        <Route path="/category/:categoryId" component={CategoryPage}/>

        <Route path="/" component={HomePage}/>

        <div class="space"></div>
      </main>
    </TwoColumns>
  </Router>
</div>