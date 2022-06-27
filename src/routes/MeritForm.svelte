<script>
  import { onMount } from "svelte";
  import { studentsData } from "../stores/meritStore.js";
  import MeritSearch from "../components/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritSearchTable.svelte";

  onMount(() => {
    google.script.run.withSuccessHandler(loadStudentsHRData).getAllStudentsHRInfo();
  });
  function loadStudentsHRData(studentsHRData) {
    studentsHRData.forEach((record, index) => {
      studentsHRData[index] = JSON.parse(record);
    });
    studentsData.set(studentsHRData);
  }
</script>

<h1>Merit Form Page</h1>
<p>
  Start by searching for the student below, either by name or by homeroom. Then select and add the
  students in Add Students section..
</p>
<MeritSearch />
<StudentHRTable />
