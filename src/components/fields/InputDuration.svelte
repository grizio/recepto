<script>
  import Field from "./Field.svelte"
  import i18n from "../../i18n"

  /** @type {string} */
  export let id
  /** @type {string} */
  export let name
  /** @type {string} */
  export let label

  /** @type {number} */
  export let value

  $: hours = Math.floor(value / 60)
  $: minutes = value % 60

  function handleHoursChanged(event) {
    const hoursValue = parseInt(event.target.value, 10)
    if (!isNaN(hoursValue)) {
      event.target.value = hoursValue
      value = hoursValue * 60 + minutes
    } else {
      event.target.value = hours
    }
  }

  function handleMinutesChanged(event) {
    const minutesValue = parseInt(event.target.value, 10)
    if (!isNaN(minutesValue)) {
      event.target.value = minutesValue
      value = hours * 60 + minutesValue
    } else {
      event.target.value = minutes
    }
  }
</script>

<style>
  .inputs {
    display: flex;
    justify-items: start;
    align-items: center;
  }
  .two-dots {
    margin: 0 8px;
  }
  input {
    width: 64px;
  }
</style>

<Field>
  <label for={id} class="field-label">{label}</label>
  <div class="inputs">
    <input
      type="number" name={name} id={id} class="field-input"
      placeholder={$i18n.t("common.fields.duration.hours")}
      value={hours.toString()}
      on:input={handleHoursChanged}
      min={0}
      max={24}
    />

    <span class="two-dots">:</span>

    <input
      type="number" name={name} id={id} class="field-input"
      placeholder={$i18n.t("common.fields.duration.minutes")}
      value={minutes}
      on:input={handleMinutesChanged}
      min={0}
      max={60}
    />
  </div>
</Field>