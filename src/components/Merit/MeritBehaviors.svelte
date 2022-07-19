<script>
  import { behaviorCategory, meritBehaviors } from "../../stores/meritStore.js";
</script>

<div>
  {#if $behaviorCategory.length > 0}
    <div class="mt-2 p-2 h-full border rounded-lg border-primary">
      <h2 class="text-xl">Behavior Category</h2>
      <fieldset>
        <legend class="text-lg">Select behavior:</legend>
        {#each $behaviorCategory as behavior}
          <div class="ml-2">
            <label>
              <input
                bind:group={$meritBehaviors}
                type="checkbox"
                id={"merit" + behavior}
                name="meritBehaviors"
                value={behavior}
              />
              {behavior}</label
            >
          </div>
        {/each}
      </fieldset>
    </div>
  {/if}
</div>
