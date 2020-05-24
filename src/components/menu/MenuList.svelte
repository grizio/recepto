<script>
  /** @type Array<MenuItem> */
  export let items
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    padding: 8px 16px;
    cursor: pointer;
    display: block;
    text-decoration: none;
    color: var(--gray-9);
  }

  li:hover {
    background-color: var(--gray-5);
  }

  li[aria-current=true], li[aria-current=true] a {
    background-color: var(--gray-9);
    color: var(--gray-1);
  }
</style>

<ul>
  {#each items as item}

    <li aria-current={item.active}>
      <a href={item.href}>
        {item.label}
      </a>
    </li>
  {/each}
</ul>