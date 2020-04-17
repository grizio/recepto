<script>
  import { createEventDispatcher } from 'svelte'
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
  <label for="recipe-name">Name</label>
  <input type="text" name="name" id="recipe-name" bind:value={recipe.name}/>

  <label for="recipe-plates">Number of plates</label>
  <input type="number" name="plates" id="recipe-plates" bind:value={recipe.plates}/>

  <label for="recipe-preparationDuration">Preparation duration</label>
  <input type="number" name="plates" id="recipe-preparationDuration" bind:value={recipe.preparationDuration}/>

  <label for="recipe-cookingDuration">Cooking duration</label>
  <input type="number" name="plates" id="recipe-cookingDuration" bind:value={recipe.cookingDuration}/>

  {#each recipe.ingredients as ingredient, index}
    <label for={`recipe-ingredients-${index}-id`}>Ingredient</label>
    <select name={`ingredients[${index}].id`} id={`recipe-ingredients-${index}-id`} bind:value={ingredient.id}>
      {#each sortedIngredients as ingredientInStore}
        <option value={ingredientInStore.id}>
          {ingredientInStore.name}
        </option>
      {/each}
    </select>

    <label for={`recipe-ingredients-${index}-quantity`}>Quantity</label>
    <input type="number" name={`ingredients[${index}].quantity`} id={`recipe-ingredients-${index}-quantity`}
           bind:value={ingredient.quantity}/>

    <label for={`recipe-ingredients-${index}-unit`}>Unit</label>
    <input type="text" name={`ingredients[${index}].unit`} id={`recipe-ingredients-${index}-unit`}
           bind:value={ingredient.unit}/>
  {/each}

  <button on:click|preventDefault={addIngredient}>New ingredient</button>

  <label for="recipe-steps">Steps</label>
  <textarea name="steps" id="recipe-steps" bind:value={recipe.steps}/>

  <button type="submit">
    Submit
  </button>
</form>