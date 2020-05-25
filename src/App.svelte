<script>
  import { onMount } from "svelte"
  import { Router, Route, links } from "svelte-routing"

  import Menu from "~/components/menu/Menu.svelte"

  import CategoryPage from "~/pages/category/CategoryPage.svelte"
  import FoodPage from "~/pages/food/FoodPage.svelte"

  import HomePage from "~/pages/home/HomePage.svelte"
  import TwoColumns from "~/components/layout/TwoColumns.svelte"
  import PageRoute from "~/components/page/PageRoute.svelte"
  import Redirect from "./components/page/Redirect.svelte"

  export let url = ""

  const basepath = /^\/?[a-zA-Z]:/.test(window.location.pathname)
    ? window.location.pathname.substr(0, window.location.pathname.indexOf(":") + 1)
    : "/"
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
  <Router url={url} basepath={basepath}>
    <TwoColumns columns="400px auto">
      <Menu/>

      <main>
        <PageRoute path="/category/:categoryId/food/:foodId" component={FoodPage}/>
        <PageRoute path="/category/:categoryId" component={CategoryPage}/>

        <PageRoute path="/" component={HomePage}/>

        <Route path="">
          <Redirect path="/"/>
        </Route>

        <div class="space"></div>
      </main>
    </TwoColumns>
  </Router>
</div>