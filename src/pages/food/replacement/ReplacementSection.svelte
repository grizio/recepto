<script>
  import i18n from "~/i18n"
  import MarkdownText from "~/components/text/MarkdownText.svelte"

  /** @type {FullReplacement} */
  export let replacement
</script>

<h3>{replacement.food.name}</h3>

<MarkdownText value={replacement.description}/>