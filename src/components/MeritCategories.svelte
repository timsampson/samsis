<script>
  import { selectedCategory, behaviorKind } from "../stores/meritStore.js";
  const categories = [
    "Merit",
    "Information",
    "Level 1",
    "Yellow Level",
    "Orange Level",
    "Red Level",
  ];
  const positiveList = ["helpful", "On task", "Diligent"];
  const informationList = ["sleepy", "eating in class", "late", "emotional"];
  const level1List = ["off task", "constantly chatting", "tardy"];
  const YCList = ["shouting", "running", "sleeping"];
  const OCList = ["fighting", "screaming", "thowing objects"];
  const RCList = ["smoking", "fireworks", "swearing"];
  $: console.log(`selectedCategory: ${$selectedCategory}`);

  let response = {
    behaviorKind: [],
    behaviorCategory: [],
    positive: [],
    information: [],
    level: [],
    YC: [],
    OC: [],
    RC: [],
  };
  function displayBehaviorKinds() {
    if ($selectedCategory === "Information") {
      $behaviorKind = informationList;
    } else if ($selectedCategory === "Level 1") {
      $behaviorKind = level1List;
    } else if ($selectedCategory === "Yellow Level") {
      $behaviorKind = YCList;
    } else if ($selectedCategory === "Orange Level") {
      $behaviorKind = OCList;
    } else if ($selectedCategory === "Red Level") {
      $behaviorKind = RCList;
    } else $behaviorKind = positiveList;
    response = response;
    uncheckBehaviorList();
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
    {#if $behaviorKind.length > 0}
      <div class="card w-64 h-72 bg-info-400 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Behavior Category</h2>
          <fieldset>
            <legend>Select behavior:</legend>
            {#each $behaviorKind as behavior}
              <div class=" ml-2">
                <label>
                  <input
                    type="checkbox"
                    id={"merit" + behavior}
                    name="behaviorList"
                    bind:value={behavior}
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
