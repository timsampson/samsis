<script>
  import { onMount } from "svelte";
  import { items } from "../stores/meritStore.js";
  import MeritSearch from "../components/MeritSearch.svelte";
  import StudentHRTable from "../components/StudentHRTable.svelte";

  onMount(() => {
    google.script.run.withSuccessHandler(loadStudentsHRData).getAllStudentsHRInfo();
  });
  function loadStudentsHRData(studentsHRData) {
    studentsHRData.forEach((record, index) => {
      studentsHRData[index] = JSON.parse(record);
    });
    items.set(studentsHRData);
  }
</script>

<h1>Merit Form Page</h1>
<p>
  Start by searching for the student below, either by name or by homeroom. Then select and add the
  students in Add Students section..
</p>
<MeritSearch />
<div class="overflow-x-auto">
  <table class="table table-compact w-full">
    <h1 class="text-2xl text-center text-blue-900">
      {#if items.length > 0}
        Below are the current Merits and Demerits.
      {:else}
        Please wait for the available Merits and Demerits to load.
      {/if}
    </h1>
    <StudentHRTable />
  </table>
</div>
