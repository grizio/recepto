<script>
  import hiddenFade from "~/components/animations/hiddenFade"
</script>

<div in:hiddenFade="{{ delay: 150, duration: 100 }}" out:hiddenFade="{{ duration: 100 }}">
  <slot/>
</div>