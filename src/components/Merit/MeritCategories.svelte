<script>
  displayBehaviorCategory();

  import {
    selectedCategory,
    behaviorList,
    meritBehaviors,
    behaviorCategories,
    informationList,
    YCList,
    OCList,
    RCList,
    HWList,
    MeritList,
    meritObjStore,
  } from "../../stores/meritStore.js";

  // $: console.log(`selectedCategory: ${$selectedCategory}`);
  // $: console.log(`meritBehaviors: ${$meritBehaviors}`);

  function displayBehaviorCategory() {
    uncheckBehaviorList();
    meritBehaviors.set([]);
    let selectedCategoryIndex = $meritObjStore.findIndex((obj) => {
      return obj.isSelected === true;
    });
    if (selectedCategoryIndex > -1) {
      selectedCategory.set($meritObjStore[selectedCategoryIndex].category);
      meritBehaviors.set($meritObjStore[selectedCategoryIndex].selected);
      behaviorList.set($meritObjStore[selectedCategoryIndex].category);
    }
    loadSelectedCategory();
  }
  export function loadSelectedCategory() {
    if ($selectedCategory === "Information") {
      $behaviorList = informationList;
    } else if ($selectedCategory === "Misconduct: Yellow Level") {
      $behaviorList = YCList;
    } else if ($selectedCategory === "Misconduct: Orange Level") {
      $behaviorList = OCList;
    } else if ($selectedCategory === "Misconduct: Red Level") {
      $behaviorList = RCList;
    } else if ($selectedCategory === "Homework") {
      $behaviorList = HWList;
    } else $behaviorList = MeritList;
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
            on:select={displayBehaviorCategory}
            type="radio"
            bind:group={$selectedCategory}
            id={"merit" + category}
            name="Merit"
            value={category}
            on:change={displayBehaviorCategory}
          />
          {category}</label
        >
      </div>
    {/each}
  </fieldset>
</div>
