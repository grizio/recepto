<script>
  import {createEventDispatcher} from 'svelte'

  /** @type {string | undefined} */
  export let title = undefined
  /** @type {boolean} */
  export let hoverable = false
  /** @type {string|undefined} */
  export let href = undefined

  const dispatch = createEventDispatcher()

  function handleOnClick() {
    if (hoverable) {
      dispatch("click")
    }
  }
</script>

<style>
  .card {
    display: block;
    border: 1px solid #f0f0f0;
  }

  .title {
    min-height: 48px;
    margin-bottom: -1px;
    padding: 16px 24px;
    color: rgba(0, 0, 0, .85);
    font-weight: 500;
    font-size: 16px;
    background: 0 0;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;
  }

  .body {
    padding: 24px;
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
  }

  .hoverable {
    cursor: pointer;
    transition: all .3s;
  }

  .hoverable:hover {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, .16), 0 3px 6px 0 rgba(0, 0, 0, .12), 0 5px 12px 4px rgba(0, 0, 0, .09);
  }
</style>

{#if href !== undefined}
  <a class="card hoverable" href={href}>
      {#if title}
        <div class="title">
            {title}
        </div>
      {/if}
    <div class="body">
      <slot/>
    </div>
  </a>
{:else}
  <div
    class="card"
    class:hoverable={hoverable}
    on:click={handleOnClick}
  >
      {#if title}
        <div class="title">
            {title}
        </div>
      {/if}
    <div class="body">
      <slot/>
    </div>
  </div>
{/if}
