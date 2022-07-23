<script>
  import {
    selectedCategory,
    behaviorList,
    meritBehaviors,
    meritBehaviorsOther,
    meritboxIsChecked,
  } from "../../stores/meritStore.js";
  $: console.log(`meritBehaviors ${$meritBehaviors}`);
  $: console.log(`meritBehaviorsOther ${$meritBehaviorsOther}`);
  $: console.log(`meritboxIsChecked ${$meritboxIsChecked}`);
</script>

<div>
  {#if $selectedCategory.length > 0}
    <div class="mt-2 p-2 h-full border rounded-lg border-primary">
      <h2 class="text-xl">Behavior Category</h2>
      <fieldset>
        <legend class="text-lg">Select behavior:</legend>

        <!-- was behaviorCategory changed to behaviorList -->
        {#each $behaviorList as behavior}
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

        <div class="ml-2">
          <label>
            <input
              on:change={meritboxIsChecked.set(!$meritboxIsChecked)}
              type="checkbox"
              id="meritBehaviorsOther"
              name="meritBehaviorsOther"
            />
            other
            <input
              type="text"
              placeholder="type here"
              disabled={!$meritboxIsChecked}
              bind:value={$meritBehaviorsOther}
            />
          </label>
        </div>
      </fieldset>
    </div>
  {/if}
</div>
