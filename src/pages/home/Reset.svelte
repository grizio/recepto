<script>
  import { getContext } from "svelte"
  import Button from "../../components/buttons/Button.svelte"

  const testStore = getContext("testStore")

  function reset() {
    testStore.set(0)
  }
</script>

<Button on:click={reset}>reset</Button>