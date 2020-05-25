<script>
  import showdown from "showdown"
  const converter = new showdown.Converter({
    simplifiedAutoLink: true,
    strikethrough: true,
    tables: true,
    openLinksInNewWindow: true,
    emoji: true
  })

  export let value
  $: html = converter.makeHtml(value)
</script>

<div>
  {@html html}
</div>