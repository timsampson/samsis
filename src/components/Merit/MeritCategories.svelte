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
<div class="mt-2 p-2 h-full border rounded-lg border-primary">
  <h2 class="text-xl">Merit Category</h2>
  <fieldset>
    <legend class="text-lg">Select a Merit Category:</legend>
    {#each behaviorCategories as category}
      <div class="ml-2">
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
