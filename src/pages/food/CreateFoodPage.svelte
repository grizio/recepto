<script>
  import i18n from "../../i18n"
  import receptoStore from "../../store/ReceptoStore"
  import { buildNewFood, addFood } from "./CreateFoodPage";

  import FoodForm from "./FoodForm.svelte"
  import Page from "../../components/Page.svelte"

  let food = buildNewFood()
</script>

<Page>
  <h1>{$i18n.t("pages.food.create.title")}</h1>

  <FoodForm bind:food on:submit={() => addFood(food)}/>
</Page>