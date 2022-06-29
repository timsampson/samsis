<script>
  import { selectedCategory } from "../stores/meritStore.js";

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
    if (response.behaviorCategories === "Information") {
      behaviorKinds = informationList;
    } else if (response.behaviorCategories === "Level 1") {
      behaviorKinds = level1List;
    } else if (response.behaviorCategories === "Yellow Level") {
      behaviorKinds = YCList;
    } else if (response.behaviorCategories === "Orange Level") {
      behaviorKinds = OCList;
    } else if (response.behaviorCategories === "Red Level") {
      behaviorKinds = RCList;
    } else behaviorKinds = positiveList;
    response = response;
    formAlert.level = true;
    formAlert = formAlert;
    uncheckBehaviorList();
  }
</script>

<!-- Merit Category Component -->
<fieldset>
  <legend>Select a Merit Category:</legend>
  {#each categories as category}
    <div class=" ml-2">
      <label>
        <input
          type="radio"
          bind:group={$selectedCategory}
          id={"merit" + category}
          name="Merit"
          value={category}
        />
        {category}</label
      >
    </div>
  {/each}
</fieldset>
