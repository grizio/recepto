<script>
  import i18n from "~/i18n"
  import Field from "./Field.svelte"
  import { isValidDuration } from "../../utils/durations"

  /** @type {string} */
  export let id
  /** @type {string} */
  export let name
  /** @type {string} */
  export let label
  /** @type {Array<string>} */
  export let durations

  /** @type {string} */
  export let value

  let internalValue
  $: internalValue = durations.findIndex(_ => _ === value)

  $: {
    if (durations) {
      durations
        .filter(_ => !isValidDuration(_))
        .forEach(duration => console.error(`Duration ${duration} is not in valid format`))
    }
  }

  function handleChange(event) {
    const internalValue = parseInt(event.target.value, 10)
    value = durations[internalValue]
  }
</script>

<style>
  .inputs {
    display: flex;
    align-items: center;
  }

  .text {
    flex-basis: 250px;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 16px;
  }
</style>

<Field>
  <label for={id} class="field-label">{$i18n.t(label)}</label>
  <div class="inputs">
    <input
      type="range" name={name} id={id} class="field-input"
      min={0}
      max={durations.length - 1}
      value={internalValue}
      on:input={handleChange}
    />

    <span class="text">{$i18n.t("common.duration.long.text", {duration: value})}</span>
  </div>
</Field>