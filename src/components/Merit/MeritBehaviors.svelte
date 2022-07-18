<script>
  import { behaviorCategory, meritBehaviors } from "../../stores/meritStore.js";
</script>

<div>
  {#if $behaviorCategory.length > 0}
    <div class="card w-72 h-72 bg-info-200 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Behavior Category</h2>
        <fieldset>
          <legend>Select behavior:</legend>
          {#each $behaviorCategory as behavior}
            <div>
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
    </div>
  {/if}
</div>
