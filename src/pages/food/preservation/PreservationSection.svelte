<script>
  import i18n from "~/i18n"
  import MarkdownText from "~/components/text/MarkdownText.svelte"

  /** @type {Preservation} */
  export let preservation
</script>

<h3>{preservation.name} ({ $i18n.t("common.duration.long.text", {duration: preservation.duration}) })</h3>

<MarkdownText value={preservation.description}/>