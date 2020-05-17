<script>
  import i18n from "~/i18n"
  import Field from "./Field.svelte"

  export let id
  export let name
  export let label
  /** @type {Array<Option>} */
  export let options

  export let value
</script>

<style>
  .inputs {
    display: flex;
  }

  .input {
    position: relative;
  }

  input[type=radio] {
    opacity: 0;
    position: fixed;
  }

  label {
    display: inline-block;
    line-height: 1.5715;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    border: 1px solid #d9d9d9;
  }

  label:hover {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  input[type=radio]:checked + label {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }
</style>

<Field>
  <span class="field-label">{$i18n.t(label)}</span>
  <div class="inputs">
    {#each options as option}
      <span class="input">
        <input type="radio" name={name} id={`${id}-${option.value}`} bind:group={value} value={option.value}/>
        <label for={`${id}-${option.value}`} class="input" aria-current={value === option.value}>{option.label}</label>
      </span>
    {/each}
  </div>
</Field>