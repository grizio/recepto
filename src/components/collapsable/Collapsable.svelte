<script>
  import { onMount } from "svelte"

  /** @type {string} */
  export let summary
  /** @type {boolean} */
  export let open = false

  // We use iframe in details and we want to avoid calling the external websites before opening the details
  let opened = false

  onMount(() => {
    opened = open
  })

  function handleSummaryClick() {
    opened = true
  }
</script>

<style>
  summary {
    cursor: pointer;
    color: rgba(0, 0, 0, .65);
    padding: 8px 0;
  }
</style>

<details open={open}>
  <summary on:click={handleSummaryClick}>{summary}</summary>

  {#if opened}
    <slot/>
  {/if}
</details>