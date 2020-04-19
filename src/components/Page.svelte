<script>
  function pageFade(node, {delay = 0, duration = 400, easing}) {
    const o = +getComputedStyle(node).opacity;
    return {
      delay,
      duration,
      easing,
      css: t => `opacity: ${t * o}`,
      tick: t => {
        if (t === 0) {
          node.style.position = "fixed"
        } else {
          node.style.position = "static"
        }
      }
    }
  }
</script>

<div in:pageFade="{{ delay: 150, duration: 100 }}" out:pageFade="{{ duration: 100 }}">
  <slot/>
</div>