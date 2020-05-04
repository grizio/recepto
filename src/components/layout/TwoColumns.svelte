<script>
  export let columns = "repeat(2, 1fr)"
  export let gap = "0"
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    grid-column-gap: var(--gap);
    grid-template-columns: var(--columns);
  }
</style>

<div class="container" style="--gap: {gap}; --columns: {columns}">
  <slot />
</div>