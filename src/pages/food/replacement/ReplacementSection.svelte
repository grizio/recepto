<script>
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import MarkdownText from "~/components/text/MarkdownText.svelte"
  import { buildReplacement } from "./ReplacementSection"

  /** @type {Replacement} */
  export let replacement

  let fullReplacement
  $: fullReplacement = buildReplacement($receptoStore, replacement)
</script>

<h3>{fullReplacement.food.name}</h3>

<MarkdownText value={fullReplacement.description}/>