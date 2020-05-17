<script>
  import { onMount } from "svelte"
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"

  import Button from "~/components/buttons/Button.svelte"
  import InputCollection from "~/components/fields/InputCollection.svelte"
  import InputText from "~/components/fields/InputText.svelte"

  import { buildNewUnit, initializeUnits, updateUnits } from "./UnitsPage"

  let units = []

  onMount(() => {
    units = initializeUnits($receptoStore)
  })
</script>

<h1>{$i18n.t("pages.units.page.title")}</h1>

<form on:submit|preventDefault={() => updateUnits(units)}>
  <InputCollection
    title={"pages.units.page.groupTitle"}
    addButtonLabel={"pages.units.page.add"}
    removeButtonLabel={"pages.units.page.remove"  }
    rowBuilder={buildNewUnit}
    bind:value={units}

    let:index={index}
  >
    <InputText
      id={`units-${index}-code`}
      name={`units[${index}].code`}
      label={"pages.units.page.code"}
      bind:value={units[index].code}
    />

    <InputText
      id={`units-${index}-label`}
      name={`units[${index}].label`}
      label={"pages.units.page.label"}
      bind:value={units[index].label}
    />
  </InputCollection>

  <Button type="primary" submit>
    {$i18n.t("pages.units.page.submit")}
  </Button>
</form>