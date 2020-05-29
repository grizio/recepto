<script>
  import i18n from "~/i18n"
  import FullMenu from "./FullMenu.svelte"
  import SearchMenu from "./SearchMenu.svelte"
  import Button from "../buttons/Button.svelte"

  /** @type {string} */
  let search = ""

  let isEN, isFR
  $: isEN = $i18n.language !== undefined && $i18n.language.startsWith("en")
  $: isFR = $i18n.language !== undefined && $i18n.language.startsWith("fr")
</script>

<style>
  nav {
    overflow: auto;
    height: 100vh;
    background-color: #ffffff;
    box-shadow: 0 0 4px #323a46;
  }

  .sitename {
    display: flex;
    align-items: center;
    padding-right: 8px;
    background-color: #282e38;
    border-bottom: 1px solid #adb5bd;
  }

  .sitename a {
    padding: 8px;
    flex-grow: 1;
    font-size: 1.5rem;
    color: #f7f7f7;
    font-weight: 700;
    text-decoration: none;
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
  <div class="sitename">
    <a href="/">{$i18n.t("appName")}</a>
    <Button
      type={isEN ? "primary" : "default"}
      on:click={() => i18n.changeLanguage("en")}
    >
      &#x1F1EC&#x1F1E7
    </Button>
    <Button
      type={isFR ? "primary" : "default"}
      on:click={() => i18n.changeLanguage("fr")}
    >
      &#x1F1EB&#x1F1F7
    </Button>
  </div>


  <label>
    <input type="search" name="search" bind:value={search} placeholder={$i18n.t("menu.search")} autocomplete="off"/>
  </label>

  <div class="menu">
    {#if search === ""}
      <FullMenu/>
    {:else}
      <SearchMenu search={search}/>
    {/if}
  </div>
</nav>
