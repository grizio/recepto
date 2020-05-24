<script>
  import i18n from "~/i18n"
  import FullMenu from "./FullMenu.svelte"
  import SearchMenu from "./SearchMenu.svelte"

  /** @type {string} */
  let search = ""
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
    --menu-height: calc(100vh - 46px - 34px);
    height: var(--menu-height);
    display: flex;
    align-items: stretch;
  }

  input[name=search] {
    width: 100%;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--gray-6);
    padding: 8px;
  }
</style>

<nav>
  <a href="/" class="sitename">{$i18n.t("menu.appName")}</a>

  <label>
    <input type="search" name="search" bind:value={search} placeholder={$i18n.t("menu.search")} autocomplete="off"/>
  </label>

  <div class="menu">
    {#if search === ""}
      <FullMenu />
    {:else}
      <SearchMenu search={search} />
    {/if}
  </div>
</nav>
