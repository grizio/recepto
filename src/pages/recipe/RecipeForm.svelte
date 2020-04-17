<script>
  import { createEventDispatcher } from 'svelte'
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { sortBy } from "../../utils/arrays"

  export let recipe

  $: sortedIngredients = sortBy($receptoStore.ingredients, _ => _.name)

  const dispatch = createEventDispatcher()

  function handleOnSubmit() {
    dispatch("submit")
  }

  function addIngredient() {
    recipe = {
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        {
          id: sortedIngredients[0].id,
          quantity: 1,
          unit: ""
        }
      ]
    }
  }
</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <label for="recipe-name">{$i18n.t("pages.recipe.form.name")}</label>
  <input type="text" name="name" id="recipe-name" bind:value={recipe.name}/>

  <label for="recipe-plates">{$i18n.t("pages.recipe.form.plates")}</label>
  <input type="number" name="plates" id="recipe-plates" bind:value={recipe.plates}/>

  <label for="recipe-preparationDuration">{$i18n.t("pages.recipe.form.preparationDuration")}</label>
  <input type="number" name="plates" id="recipe-preparationDuration" bind:value={recipe.preparationDuration}/>

  <label for="recipe-cookingDuration">{$i18n.t("pages.recipe.form.cookingDuration")}</label>
  <input type="number" name="plates" id="recipe-cookingDuration" bind:value={recipe.cookingDuration}/>

  {#each recipe.ingredients as ingredient, index}
    <label for={`recipe-ingredients-${index}-id`}>{$i18n.t("pages.recipe.form.ingredient.id")}</label>
    <select name={`ingredients[${index}].id`} id={`recipe-ingredients-${index}-id`} bind:value={ingredient.id}>
      {#each sortedIngredients as ingredientInStore}
        <option value={ingredientInStore.id}>
          {ingredientInStore.name}
        </option>
      {/each}
    </select>

    <label for={`recipe-ingredients-${index}-quantity`}>{$i18n.t("pages.recipe.form.ingredient.quantity")}</label>
    <input type="number" name={`ingredients[${index}].quantity`} id={`recipe-ingredients-${index}-quantity`}
           bind:value={ingredient.quantity}/>

    <label for={`recipe-ingredients-${index}-unit`}>{$i18n.t("pages.recipe.form.ingredient.unit")}</label>
    <input type="text" name={`ingredients[${index}].unit`} id={`recipe-ingredients-${index}-unit`}
           bind:value={ingredient.unit}/>
  {/each}

  <button on:click|preventDefault={addIngredient}>{$i18n.t("pages.recipe.form.ingredient.add")}</button>

  <label for="recipe-steps">{$i18n.t("pages.recipe.form.steps")}</label>
  <textarea name="steps" id="recipe-steps" bind:value={recipe.steps}/>

  <button type="submit">
    {$i18n.t("pages.recipe.form.submit")}
  </button>
</form>