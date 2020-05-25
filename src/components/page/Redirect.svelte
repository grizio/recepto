<script>
  import { navigate } from "svelte-routing"
  import { onMount } from "svelte"

  /** @type {string} */
  export let path

  onMount(() => {
    navigate(path)
  })
</script>

<div></div>