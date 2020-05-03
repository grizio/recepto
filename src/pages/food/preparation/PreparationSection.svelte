<script>
  import i18n from "~/i18n"
  import MarkdownText from "~/components/text/MarkdownText.svelte"

  /** @type {Preparation} */
  export let preparation
</script>

<h3>{preparation.name}</h3>

<MarkdownText value={preparation.description} />