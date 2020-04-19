<script>
  export let columns = 3
  export let gap = 0
</script>

<style>
  .container {
    display: grid;
    width: 100%;
    grid-column-gap: var(--gap);
    grid-template-columns: repeat(var(--columns), calc(100% / var(--columns)));
  }
</style>

<div class="container" style="--gap: {gap}; --columns: {columns}">
  <slot />
</div>