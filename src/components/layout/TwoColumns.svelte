<script>
  export let columns = "repeat(2, 1fr)"
  export let gap = "0"
  export let transition = "none"
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    grid-column-gap: var(--gap);
    grid-template-columns: var(--columns);
    transition: var(--transition);
  }
</style>

<div class="container" style="--gap: {gap}; --columns: {columns}; --transition: {transition}">
  <slot />
</div>