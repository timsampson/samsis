<script>
  import { fade } from "svelte/transition";
  import { filtered } from "../stores/meritStore.js";
  import { selected } from "../stores/meritStore.js";
  let titleValues = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];

  const addToSelected = (student) => {
    console.log(`id: ${JSON.stringify(student)}`);
  };
</script>

<div class="overflow-x-auto">
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th>Add</th>
        {#each titleValues as title}
          <th>{title}</th>
        {/each}
      </tr>
    </thead>
    {#if $filtered.length > 0 || $selected.length > 0}
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
        {#each $filtered as student (student.student_id)}
          <tr>
            <button
              type="button"
              class="ml-2 btn btn-circle btn-success btn-sm"
              on:click={() => addToSelected(student)}
            >
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
            <td contenteditable="true">{student.student_id}</td>
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
