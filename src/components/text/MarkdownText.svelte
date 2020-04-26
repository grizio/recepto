<script>
  import showdown from "showdown"
  const converter = new showdown.Converter()

  export let value
  $: html = converter.makeHtml(value)
</script>

<div>
  {@html html}
</div>