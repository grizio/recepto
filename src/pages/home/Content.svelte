<script>
  import { getContext } from "svelte"
  import Button from "../../components/buttons/Button.svelte"

  const testStore = getContext("testStore")

  function minus() {
    testStore.update(value => value - 1)
  }

  function plus() {
    testStore.update(value => value + 1)
  }
</script>

<Button on:click={minus}>-</Button>
<Button on:click={plus}>+</Button>