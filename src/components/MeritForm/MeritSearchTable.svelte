<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { filtered, selectedData, studentsData } from "../../stores/meritStore.js";
  let titleValues = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];
  onMount(() => {
    google.script.run.withSuccessHandler(loadStudentsHRData).getAllStudentsHRInfo();
  });
  function loadStudentsHRData(studentsHRData) {
    studentsHRData.forEach((record, index) => {
      studentsHRData[index] = JSON.parse(record);
    });
    studentsData.set(studentsHRData);
  }
  const addToSelected = (student_id, student) => {
    $selectedData = [...$selectedData, student];
    $studentsData = $studentsData.filter((student) => student.student_id !== student_id);
  };
  const removeFromSelected = (student_id, student) => {
    $studentsData = [...$studentsData, student];
    $selectedData = $selectedData.filter((student) => student.student_id !== student_id);
  };
</script>

<div class="overflow-x-auto">
  <h1 class="my-2 text-lg">Selected</h1>
  <p class="mt-2" fade={{ duration: 1000 }}>
    {$selectedData.length > 0
      ? "Once you have finished selecting students, click the next button."
      : "Please select students from the list below."}
  </p>
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    {#if $selectedData.length > 0}
      <thead>
        <tr>
          <th />
          {#each titleValues as title}
            <th>{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $selectedData as student (student.student_id)}
          <tr>
            <button
              on:click={() => removeFromSelected(student.student_id, student)}
              type="button"
              class="btn btn-circle btn-error btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <td>{student.student_id}</td>
            <td>{student.student_name}</td>
            <td>{student.homeroom}</td>
            <td>{student.hr_teacher}</td>
            <td>{student.grade}</td>
            <td>{student.school}</td>
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
</div>
<div class="overflow-x-auto">
  <p class="mt-2" fade={{ duration: 1000 }}>
    {$filtered.length > 0
      ? "Below are the available students."
      : "Please wait for the available students to load."}
  </p>
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th />
        {#each titleValues as title}
          <th>{title}</th>
        {/each}
      </tr>
    </thead>
    {#if $filtered.length > 0}
      <tbody>
        {#each $filtered as student (student.student_id)}
          <tr>
            <button
              on:click={() => addToSelected(student.student_id, student)}
              type="button"
              class="btn btn-circle btn-success btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <td>{student.student_id}</td>
            <td>{student.student_name}</td>
            <td>{student.homeroom}</td>
            <td>{student.hr_teacher}</td>
            <td>{student.grade}</td>
            <td>{student.school}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th />
          {#each titleValues as title}
            <th>{title}</th>
          {/each}
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
