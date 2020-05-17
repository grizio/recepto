<script>
  import hiddenFade from "~/components/animations/hiddenFade"
  import receptoStore from "~/store/ReceptoStore"
  import i18n from "~/i18n"
  import { removeSearch } from "./SearchContainer"

  import Collapsable from "~/components/collapsable/Collapsable.svelte"
  import TwoColumns from "~/components/layout/TwoColumns.svelte"
  import Button from "~/components/buttons/Button.svelte"
  import AddSearch from "./AddSearch.svelte"

  /** @type {Food} */
  export let food

  /** @type {boolean} */
  let open = false

  function openSearch() {
    open = true
  }

  function closeSearch() {
    open = false
  }
</script>

<style>
  aside {
    padding-left: 16px;
    border-left: 1px solid var(--gray-6);
  }
</style>

<TwoColumns
  columns={`1fr ${open ? "800px" : "75px"}`}
  transition={open ? `all 250ms ease-in-out 0ms` : `all 250ms ease-in-out 250ms`}
>
  <div>
    <slot/>
  </div>

  <aside>
    {#if open}
      <div in:hiddenFade="{{ delay: 250, duration: 250 }}" out:hiddenFade="{{ delay: 0, duration: 250 }}">
        <Button on:click={closeSearch}>
          &#x21AA
        </Button>
        {#each $receptoStore.searches as search, index}
          <Collapsable summary={$i18n.t("pages.food.page.asideSearch", { sitename: search.sitename })}>
            <Button danger on:click={() => removeSearch(index, $i18n)}>
              {$i18n.t("pages.food.searches.remove", { sitename: search.sitename })}
            </Button>

            <iframe src={search.url.replace("{s}", food.name)}
                    title={$i18n.t("pages.food.page.asideSearch", { sitename: search.sitename })}
                    width="100%"
                    height="500px"></iframe>
          </Collapsable>
        {/each}

        <AddSearch />
      </div>
    {:else}
      <div in:hiddenFade="{{ delay: 200, duration: 250 }}" out:hiddenFade="{{ delay: 0, duration: 250 }}">
        <Button on:click={openSearch}>
          &#x1F50D
        </Button>
      </div>
    {/if}
  </aside>
</TwoColumns>