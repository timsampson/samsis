<script>
  import { selectedCategory, behaviorKinds, meritBehaviors } from "../../stores/meritStore.js";
  const categories = [
    "Merit",
    "Information",
    "Level 1",
    "Yellow Level",
    "Orange Level",
    "Red Level",
    "Homework",
  ];
  const positiveList = ["helpful", "On task", "Diligent"];
  const informationList = ["sleepy", "eating in class", "late", "emotional"];
  const level1List = ["off task", "constantly chatting", "tardy"];
  const YCList = ["shouting", "running", "sleeping"];
  const OCList = ["fighting", "screaming", "thowing objects"];
  const RCList = ["smoking", "fireworks", "swearing"];
  const HWList = ["late", "incomplete", "unsubmitted"];
  $: console.log(`selectedCategory: ${$selectedCategory}`);
  $: console.log(`meritBehaviors: ${$meritBehaviors}`);

  function displayBehaviorKinds() {
    if ($selectedCategory === "Information") {
      $behaviorKinds = informationList;
    } else if ($selectedCategory === "Level 1") {
      $behaviorKinds = level1List;
    } else if ($selectedCategory === "Yellow Level") {
      $behaviorKinds = YCList;
    } else if ($selectedCategory === "Orange Level") {
      $behaviorKinds = OCList;
    } else if ($selectedCategory === "Red Level") {
      $behaviorKinds = RCList;
    } else if ($selectedCategory === "Homework") {
      $behaviorKinds = HWList;
    } else $behaviorKinds = positiveList;
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
  <div class="card w-64 h-72 bg-info-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Merit Category</h2>
      <fieldset>
        <legend>Select a Merit Category:</legend>
        {#each categories as category}
          <div class="ml-2">
            <label>
              <input
                on:select={displayBehaviorKinds}
                type="radio"
                bind:group={$selectedCategory}
                id={"merit" + category}
                name="Merit"
                value={category}
                on:change={displayBehaviorKinds}
              />
              {category}</label
            >
          </div>
        {/each}
      </fieldset>
    </div>
  </div>
  <div class="ml-4">
    {#if $behaviorKinds.length > 0}
      <div class="card w-64 h-72 bg-info-400 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Behavior Category</h2>
          <fieldset>
            <legend>Select behavior:</legend>
            {#each $behaviorKinds as behavior}
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
  </div>
</div>
