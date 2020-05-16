<script>
  import InputText from "~/components/fields/InputText.svelte"
  import InputTextarea from "~/components/fields/InputTextarea.svelte"
  import InputDuration from "~/components/fields/InputDuration.svelte"

  /** @type {Preservation} */
  export let preservation
  /** @type {string} */
  export let id
  /** @type {string} */
  export let name

  const durations = [
    "P1D", "P2D", "P3D", "P4D", "P5D", "P6D",
    "P1W", "P2W", "P3W", "P4W", "P1M", "P6W",
    "P2M", "P3M", "P4M", "P5M", "P6M", "P7M", "P8M", "P9M", "P10M", "P11M",
    "P1Y", "P2Y", "P3Y", "P4Y", "P5Y", "P8Y", "P10Y", "P15Y", "P20Y",
  ]

  let idPrefix, namePrefix
  $: idPrefix = id !== undefined ? `${id}-` : ""
  $: namePrefix = name !== undefined ? `${name}.` : ""
</script>

<InputText
  id={`${idPrefix}name`}
  name={`${namePrefix}name`}
  label="pages.food.form.preservation.name"
  bind:value={preservation.name}
/>

<InputDuration
  id={`${idPrefix}duration`}
  name={`${namePrefix}duration`}
  durations={durations}
  label="pages.food.form.preservation.duration"
  bind:value={preservation.duration}
/>

<InputTextarea
  id={`${idPrefix}description`}
  name={`${namePrefix}description`}
  label="pages.food.form.preservation.description"
  bind:value={preservation.description}
/>