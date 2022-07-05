<script>
  import { onMount } from "svelte";
  import MeritTable from "../components/MeritForm/MeritTable.svelte";
  import { meritValues } from "../stores/meritStore.js";
  onMount(() => {
    google.script.run.withSuccessHandler(displayMerits).getAllMeritInfo();
  });
  function displayMerits(meritData) {
    meritData.forEach((record, index) => {
      meritData[index] = JSON.parse(record);
      meritData[index].timestamp = new Date(meritData[index].timestamp);
      meritData[index].all_details = meritData[index].attendance_details
        .concat(meritData[index].merit_details, meritData[index].homework_details)
        .trim();
    });
    meritValues.set(meritData);
  }
</script>

<div class="container mx-auto">
  <h1 class="text-xl">Merit Admin Page</h1>
  <p class="mt-1 py-2">The list below will display all the Merits and Demerits.</p>
  <div class="overflow-x-auto">
    <h1 class="text-2xl text-center text-blue-900">
      {#if $meritValues.length > 0}
        Below are the current Merits and Demerits.
      {:else}
        Please wait for the available Merits and Demerits to load.
      {/if}
    </h1>
    <MeritTable />
  </div>
</div>
