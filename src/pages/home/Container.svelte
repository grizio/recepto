<script>
  import { setContext } from "svelte"
  import { createTestStore } from "./TestStore"
  import Content from "./Content.svelte"

  const store = createTestStore(0)
  setContext("testStore", store)
</script>

{$store}
<Content />

<slot />