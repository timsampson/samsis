<script>
  import { onMount } from "svelte";
  import MeritAdminTable from "../components/Merit/MeritAdminTable.svelte";
  import { meritAdminValues, meritModalTeachers } from "../stores/meritAdminStore.js";
  onMount(() => {
    google.script.run.withSuccessHandler(setAdminMerits).getAllMeritInfo();
    google.script.run.withSuccessHandler(setTeacherList).getStaffInfo();
  });
  function setAdminMerits(allMeritData) {
    console.log("setAdminMerits");
    allMeritData.forEach((record, index) => {
      allMeritData[index] = JSON.parse(record);
      allMeritData[index].timestamp = new Date(allMeritData[index].timestamp);
      allMeritData[index].incident_date = new Date(allMeritData[index].incident_date);
    });
    meritAdminValues.set(allMeritData);
  }
  function setTeacherList(teachersList) {
    console.log("setTeacherList");
    meritModalTeachers.set(teachersList);
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
