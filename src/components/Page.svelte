<script>
  import { fade } from 'svelte/transition'
</script>

<div in:fade="{{ delay: 150, duration: 100 }}" out:fade="{{ duration: 100 }}">
  <slot />
</div>