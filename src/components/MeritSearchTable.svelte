<script>
  import { fade } from "svelte/transition";
  import { filtered, term } from "../stores/meritStore.js";
  import { selectedData } from "../stores/meritStore.js";
  import { studentsData } from "../stores/meritStore.js";
  let titleValues = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];
  const addToSelected = (index, student, obj) => {
    // console.log(`$studentsData[index]: ${JSON.stringify($studentsData[index])}`);
    $studentsData = $studentsData.filter((currentValue, idx) => idx !== index);
    // console.log(`$studentsData[index]: ${JSON.stringify($studentsData[index])}`);
    $selectedData = [...$selectedData, student];
  };
  const removeFromSelected = (index, student, obj) => {
    // console.log(`$selected[index]: ${JSON.stringify($selected[index])}`);
    $selectedData = $selectedData.filter((currentValue, idx) => idx !== index);
    // console.log(`$selected[index]: ${JSON.stringify($selected[index])}`);
    $studentsData = [...$studentsData, student];
  };
</script>

<div class="overflow-x-auto">
  <h1 class="my-2">Selected</h1>
  <p class="mt-2">
    {#if $selectedData.length > 0}
      Below are the selected students.
    {:else}
      Please select a student.
    {/if}
  </p>
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    {#if $selectedData.length > 0}
      <thead>
        <tr>
          <th />
          <th>#</th>
          {#each titleValues as title}
            <th>{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $selectedData as student, i (student.student_id)}
          <tr>
            <button
              on:click={removeFromSelected.bind(this, i, student)}
              type="button"
              class="ml-2 btn btn-circle btn-error btn-sm"
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
            <td>{i + 1}</td>
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
  <p class="mt-2">
    {#if $filtered.length > 0}
      Below are the available students.
    {:else}
      Please wait for the available students to load.
    {/if}
  </p>
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th />
        <th>#</th>
        {#each titleValues as title}
          <th>{title}</th>
        {/each}
      </tr>
    </thead>
    {#if $filtered.length > 0}
      <tbody>
        {#each $filtered as student, i (student.student_id)}
          <tr>
            <button
              on:click={addToSelected.bind(this, i, student)}
              type="button"
              class="ml-2 btn btn-circle btn-success btn-sm"
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
            <td>{i + 1}</td>
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
          <th>#</th>
          {#each titleValues as title}
            <th>{title}</th>
          {/each}
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
