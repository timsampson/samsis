<script>
  import { onMount } from "svelte";
  import MeritAdminTable from "../components/MeritForm/MeritAdminTable.svelte";
  import { meritAdminValues } from "../stores/meritAdminStore.js";
  onMount(() => {
    google.script.run.withSuccessHandler(setAdminMerits).getAllMeritInfo();
  });
  function setAdminMerits(allMeritData) {
    console.log("updating data for meritAdminValues");
    allMeritData.forEach((record, index) => {
      allMeritData[index] = JSON.parse(record);
      allMeritData[index].timestamp = new Date(allMeritData[index].timestamp);
    });
    meritAdminValues.set(allMeritData);
  }
</script>

<div class="container mx-auto">
  <h1 class="text-xl">Merit Admin Page</h1>
  <p class="mt-1 py-2">The list below will display all the Merits and Demerits.</p>
  <div class="overflow-x-auto">
    <h1 class="text-2xl text-center text-blue-900">
      {#if $meritAdminValues.length > 0}
        Below are the current Merits and Demerits.
      {:else}
        Please wait for the available Merits and Demerits to load.
      {/if}
    </h1>
    <MeritAdminTable />
  </div>
</div>
