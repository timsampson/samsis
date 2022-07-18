<script>
  import {
    selectedCategory,
    behaviorCategory,
    meritBehaviors,
    behaviorCategories,
    informationList,
    YCList,
    OCList,
    RCList,
    HWList,
    MeritList,
  } from "../../stores/meritStore.js";

  $: console.log(`selectedCategory: ${$selectedCategory}`);
  $: console.log(`meritBehaviors: ${$meritBehaviors}`);

  function displaybehaviorCategory() {
    if ($selectedCategory === "Information") {
      $behaviorCategory = informationList;
    } else if ($selectedCategory === "Misconduct: Yellow Level") {
      $behaviorCategory = YCList;
    } else if ($selectedCategory === "Misconduct: Orange Level") {
      $behaviorCategory = OCList;
    } else if ($selectedCategory === "Misconduct: Red Level") {
      $behaviorCategory = RCList;
    } else if ($selectedCategory === "Homework") {
      $behaviorCategory = HWList;
    } else $behaviorCategory = MeritList;
    uncheckBehaviorList();
    meritBehaviors.set([]);
  }
  function uncheckBehaviorList() {
    let checkboxes = document.getElementsByName("behaviorList");
    for (let i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = false;
    }
  }
</script>

<!-- Merit Category Component -->
<div class="container flex justify-start ">
  <div class="card w-72 h-72 bg-info-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Merit Category</h2>
      <fieldset>
        <legend>Select a Merit Category:</legend>
        {#each behaviorCategories as category}
          <div>
            <label>
              <input
                on:select={displaybehaviorCategory}
                type="radio"
                bind:group={$selectedCategory}
                id={"merit" + category}
                name="Merit"
                value={category}
                on:change={displaybehaviorCategory}
              />
              {category}</label
            >
          </div>
        {/each}
      </fieldset>
    </div>
  </div>
  <!-- <div class="ml-4">
    {#if $behaviorCategory.length > 0}
      <div class="card w-64 h-72 bg-info-400 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Behavior Category</h2>
          <fieldset>
            <legend>Select behavior:</legend>
            {#each $behaviorCategory as behavior}
              <div class=" ml-2">
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
  </div> -->
</div>
