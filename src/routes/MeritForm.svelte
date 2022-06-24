<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import StudentHRTable from "../components/StudentHRTable.svelte";
  import { term } from "../stores/meritStore.js";
  import { items } from "../stores/meritStore.js";
  let searchCategories = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];
  let val = "";
  $: term.set(val.toLowerCase().trim());
  $: console.log(term);
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
<table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
  <thead>
    <tr>
      {#each searchCategories as category}
        <th>{category}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr class="odd:bg-gray-200">
      <td>
        <input
          type="search"
          id="searchMerit"
          placeholder="Type here"
          class="input w-full max-w-xs"
          bind:value={val}
        />
      </td>
    </tr>
  </tbody>
</table>
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
