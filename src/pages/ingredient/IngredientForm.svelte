<script>
  import { createEventDispatcher } from 'svelte'
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { sortBy } from "../../utils/arrays"

  export let ingredient

  $: sortedRecipes = sortBy($receptoStore.recipes, _ => _.name)

  const dispatch = createEventDispatcher()

  function handleOnSubmit() {
    dispatch("submit")
  }

  function addPreservation() {
    ingredient = {
      ...ingredient,
      preservations: [...ingredient.preservations, {
        name: "",
        duration: "",
        description: ""
      }]
    }
  }

  function addRecipe() {
    ingredient = {
      ...ingredient,
      recipes: [...ingredient.recipes, sortedRecipes[0].id]
    }
  }
</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <label for="ingredient-name">{$i18n.t("pages.ingredient.form.name")}</label>
  <input type="text" name="name" id="ingredient-name" bind:value={ingredient.name}/>

  <label for="ingredient-description">{$i18n.t("pages.ingredient.form.description")}</label>
  <textarea name="description" id="ingredient-description" bind:value={ingredient.description}></textarea>

  {#each ingredient.preservations as preservation, index}
    <label for={`ingredient-preservation-${index}-name`}>{$i18n.t("pages.ingredient.form.preservation.name")}</label>
    <input type="text" name={`preservation[${index}].name`} id={`ingredient-preservation-${index}-name`}
           bind:value={preservation.name}/>

    <label for={`ingredient-preservation-${index}-duration`}>{$i18n.t("pages.ingredient.form.preservation.duration")}</label>
    <input type="text" name={`preservation[${index}].duration`} id={`ingredient-preservation-${index}-duration`}
           bind:value={preservation.duration}/>

    <label for={`ingredient-preservation-${index}-description`}>{$i18n.t("pages.ingredient.form.preservation.description")}</label>
    <textarea name={`preservation[${index}].description`} id={`ingredient-preservation-${index}-description`}
              bind:value={preservation.description}/>
  {/each}

  <button on:click|preventDefault={addPreservation}>{$i18n.t("pages.ingredient.form.preservation.add")}</button>

  {#each ingredient.recipes as recipe, index}
    <label for={`ingredient-recipes-${index}`}>{$i18n.t("pages.ingredient.form.recipe.select")}</label>
    <select name={`recipes[${index}]`} id={`ingredient-recipes-${index}`} bind:value={recipe}>
      {#each sortedRecipes as recipeInStore}
        <option value={recipeInStore.id}>
          {recipeInStore.name}
        </option>
      {/each}
    </select>
  {/each}

  <button on:click|preventDefault={addRecipe}>{$i18n.t("pages.ingredient.form.recipe.add")}</button>

  <button type="submit">
    {$i18n.t("pages.ingredient.form.submit")}
  </button>
</form>