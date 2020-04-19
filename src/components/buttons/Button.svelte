<script>
  import { createEventDispatcher } from 'svelte'

  /** @type { "primary" | "default" | undefined } */
  export let type = "default"
  /** @type {boolean} */
  export let danger = false
  /** @type { string | undefined } */
  export let href = undefined
  /** @type {boolean} */
  export let submit = false

  const dispatch = createEventDispatcher()

  function handleOnClick(event) {
    dispatch("click")
  }
</script>

<style>
  button, a {
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    user-select: none;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    text-decoration: none;
  }

  .primary {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .primary:hover {
    background-color: var(--primary-color-5);
    border-color: var(--primary-color-5);
  }

  .default {
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    border-color: #d9d9d9;
  }

  .default:hover {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  .primary.danger {
    color: #fff;
    background-color: var(--red-5);
    border-color: var(--red-5);
  }

  .primary.danger:hover {
    background-color: var(--red-4);
    border-color: var(--red-4);
  }

  .default.danger {
    color: var(--red-5);
    background-color: #fff;
    border-color: var(--red-5);
  }

  .default.danger:hover {
    color: var(--red-4);
    border-color: var(--red-4);
  }
</style>

{#if href !== undefined}
  <a
    {href}
    on:click={handleOnClick}
    class:primary={type === "primary"}
    class:default={type === "default"}
    class:danger={danger}
  >
    <slot/>
  </a>
{:else}
  <button
    type={submit ? "submit" : "button"}
    on:click={handleOnClick}
    class:primary={type === "primary"}
    class:default={type === "default"}
    class:danger={danger}
  >
    <slot/>
  </button>
{/if}
