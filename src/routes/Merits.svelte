<script>
  import { onMount } from "svelte";
  import { meritIndividualStudentValues } from "../stores/meritIndividualStore.js";

  import MeritIndividualTable from "../components/Merit/MeritIndividualTable.svelte";
  onMount(() => {
    google.script.run.withSuccessHandler(displayUserMerits).getSingeUserMeritInfo();
  });
  function displayUserMerits(meritData) {
    console.log(`it works!`);
    meritData.forEach((record, index) => {
      meritData[index] = JSON.parse(record);
      meritData[index].incident_date = new Date(meritData[index].incident_date);
      meritData[index].timestamp = new Date(meritData[index].timestamp);

      meritData[index].details = meritData[index].attendance_details
        .concat(meritData[index].merit_details, meritData[index].homework_details)
        .trim();
    });
    meritIndividualStudentValues.set(meritData);
  }
</script>

<div class="container mx-auto">
  <h1 class="text-xl">Merit Page</h1>
  <p class="mt-1 py-2">
    If you have any Merits or Demerits entered by teachers or administrators, you will see them
    here.
  </p>
  <div class="overflow-x-auto">
    <table class="table table-compact w-full">
      <h1 class="text-2xl text-center text-blue-900">
        {#if $meritIndividualStudentValues.length > 0}
          Below are the current Merits and Demerits.
        {:else}
          Please wait for the available Merits and Demerits to load.
        {/if}
      </h1>
      <MeritIndividualTable />
    </table>
  </div>
</div>
