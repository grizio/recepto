<script>
  import { Route } from "svelte-routing"
  import Page from "./Page.svelte"

  /** @type {string} */
  export let path

  /** @type {any} */
  export let component
</script>

<Route path={path} let:location={location} let:params={routeParams}>
  {#each [`${Date.now()}-${Math.random()}`] as x(x)}
    <Page>
      <svelte:component this={component} location={location} {...routeParams} />
    </Page>
  {/each}
</Route>