<script>
  import MarkdownText from "~/components/text/MarkdownText.svelte"

  /** @type {Description} */
  export let description
</script>

<MarkdownText value={description.content} />