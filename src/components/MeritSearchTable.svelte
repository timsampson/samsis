<script>
  import { fade } from "svelte/transition";
  import { filtered } from "../stores/meritStore.js";
  import { selected } from "../stores/meritStore.js";
  import { studentsData } from "../stores/meritStore.js";
  let titleValues = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];
  const addToSelected = (index, student, obj) => {
    console.log(`$studentsData[index]: ${JSON.stringify($studentsData[index])}`);
    $studentsData = $studentsData.filter((e, i) => i !== index);

    console.log(`$studentsData[index]: ${JSON.stringify($studentsData[index])}`);
    // console.log(`obj: ${JSON.stringify(obj)}`);
    // console.log(`student: ${JSON.stringify(student)}`);
    $selected = [...$selected, student];
    // console.log(`selected: ${JSON.stringify($studentsData)}`);
  };
</script>

<div class="overflow-x-auto">
  <h1 class="my-2">Selected</h1>
  <p class="mt-2">
    {#if $selected.length > 0}
      Below are the selected students.
    {:else}
      Please select a student.
    {/if}
  </p>
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    {#if $selected.length > 0}
      <thead>
        <tr>
          {#each titleValues as title}
            <th>{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $selected as select}
          <tr>
            <td>{select.student_id}</td>
            <td>{select.student_name}</td>
            <td>{select.homeroom}</td>
            <td>{select.hr_teacher}</td>
            <td>{select.grade}</td>
            <td>{select.school}</td>
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
        <th>Add</th>
        <th>#</th>
        {#each titleValues as title}
          <th>{title}</th>
        {/each}
      </tr>
    </thead>
    {#if $filtered.length > 0}
      <tbody>
        {#each $filtered as student, i (student.student_id)}
          <tr on:click={addToSelected.bind(this, i, student)}>
            <button type="button" class="ml-2 btn btn-circle btn-success btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                /></svg
              >
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
          {#each titleValues as title}
            <th>{title}</th>
          {/each}
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
