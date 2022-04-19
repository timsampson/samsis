<script>
  import { onMount } from "svelte";
  onMount(() => {
    console.log("onMount Loaded");
    google.script.run.withSuccessHandler(displayClubs).getClubList();
  });
  function displayClubs(clubsObj) {
    console.table(clubsObj);
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Sign Up</h1>
<fieldset class="text-gray-700">
  <legend>Choose all the vegetables you like to eat</legend>
  <ul>
    <li>
      <label for="carrots">Carrots</label>
      <input type="checkbox" id="carrots" name="vegetable" value="carrots" checked />
    </li>
    <li>
      <label for="peas">Peas</label>
      <input type="checkbox" id="peas" name="vegetable" value="peas" />
    </li>
    <li>
      <label for="cabbage">Cabbage</label>
      <input type="checkbox" id="cabbage" name="vegetable" value="cabbage" />
    </li>
  </ul>
</fieldset>
