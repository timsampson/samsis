<script>
  import { fade } from "svelte/transition";
  import { filtered } from "../stores/meritStore.js";
  let titleValues = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];
</script>

<div class="overflow-x-auto">
  <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        {#each titleValues as title}
          <th>{title}</th>
        {/each}
      </tr>
    </thead>
    {#if $filtered.length > 0}
      <tbody>
        {#each $filtered as student}
          <tr class="odd:bg-gray-200">
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
