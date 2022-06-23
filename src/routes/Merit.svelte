<script>
  import { onMount } from "svelte";
  import MeritTable from "../components/MeritTable.svelte";
  let meritValues = [];
  onMount(() => {
    google.script.run.withSuccessHandler(displayMerits).getAllMeritInfo();
  });
  function displayMerits(meritData) {
    meritData.forEach((record, index) => {
      meritData[index] = JSON.parse(record);
      meritData[index].timestamp = new Date(meritData[index].timestamp);
      meritData[index].details = meritData[index].attendance_details
        .concat(meritData[index].merit_details, meritData[index].homework_details)
        .trim();
    });
    meritValues = meritData;
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Merit Page</h1>
<p class="mt-1 py-2">
  If you have any Merits or Demerits entered by teachers or administrators, you will see them here.
</p>
<div class="overflow-x-auto">
  <table class="table table-compact w-full">
    <h1 class="text-2xl text-center text-blue-900">
      {#if meritValues.length > 0}
        Below are the currently available clubs.
      {:else}
        Please wait for the available clubs to load.
      {/if}
    </h1>
    <MeritTable {meritValues} />
  </table>
</div>
