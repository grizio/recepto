<script>
  import i18n from "~/i18n"
  import receptoStore from "~/store/ReceptoStore"
  import { nonEmpty } from "~/utils/arrays"
  import Button from "~/components/buttons/Button.svelte"
  import InputFile from "~/components/fields/InputFile.svelte"
  import Container from "./Container.svelte"
  import Reset from "./Reset.svelte"
  import { getContext } from "svelte"


  function handleSaveClick() {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify($receptoStore)))
    element.setAttribute("download", "recepto.json")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  function handleLoadFiles(event) {
    if (nonEmpty(event.target.files)) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = JSON.parse(e.target.result)
        receptoStore.load(result)
      }
      reader.readAsText(file)
      event.target.value = ""
    }
  }

  const testStore = getContext("testStore")

  function reset() {
    testStore.set(0)
  }
</script>

<h1>Recepto</h1>

<h2>Load</h2>

<InputFile
  id="input-load"
  name="load"
  label={$i18n.t("home")}
  on:change={handleLoadFiles}
/>

<h2>Save</h2>

<Button type="primary" on:click={handleSaveClick}>
  &#x1F4BE Save current data on disk
</Button>

<h2>Container 1</h2>
<Container />

<h2>Container 2</h2>
<Container />

<h2>Container 3</h2>
<Container>
  <Reset />
</Container>

<h2>Container 4</h2>
<Container>
  <Button on:click={reset}>reset here</Button>
</Container>