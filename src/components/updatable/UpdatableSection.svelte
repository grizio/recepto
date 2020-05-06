<script>
  import { createEventDispatcher, onMount } from "svelte"

  import Button from "~/components/buttons/Button.svelte"

  /** @type {"view" | "edit"} */
  export let initialState

  let editing = false

  onMount(() => {
    editing = initialState === "edit"
  })

  const dispatch = createEventDispatcher()

  function onEdit() {
    editing = true
  }

  function onSave() {
    editing = false
    dispatch("save")
  }

  function onCancel() {
    editing = false
    dispatch("cancel")
  }
</script>

<style>
  .container.view {
    display: grid;
    grid-template-columns: 1fr 32px;
  }

  .edit-button {
    visibility: hidden;
    padding: 0;
    border: none;
    background: var(--gray-5);
    outline: 2px solid var(--gray-5);
    cursor: pointer;
  }

  .container.view:hover {
    outline: 2px dashed var(--gray-5);
  }

  .container.view:hover .edit-button {
    visibility: visible;
  }

  .container.edit {
    outline: 2px dashed var(--gray-5);
    padding: 8px;
  }
</style>

<div class="container" class:view={!editing} class:edit={editing}>
  {#if editing}
    <slot name="edit"/>

    <Button on:click={onSave}>&#x2714</Button>
    <Button on:click={onCancel}>&#x274C</Button>
  {:else}
    <slot name="view"/>

    <button class="edit-button" on:click={onEdit}>&#x1F58A</button>
  {/if}
</div>