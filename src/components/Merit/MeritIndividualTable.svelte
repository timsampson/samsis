<script>
  import { fade } from "svelte/transition";
  import { meritIndividualStudentValues } from "../../stores/meritIndividualStore.js";
</script>

<div class="overflow-x-auto">
  <table class="table table-compact w-full table-zebra" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th>id</th>
        <th>Incident Date</th>
        <th>Student</th>
        <th>Teacher</th>
        <th>Subject</th>
        <th>Category</th>
        <th>Type</th>
        <th>Details</th>
      </tr>
    </thead>
    {#if $meritIndividualStudentValues.length > 0}
      <tbody>
        {#each $meritIndividualStudentValues as merit}
          <tr>
            <td>{merit.id}</td>
            <td>{merit.incident_date.toLocaleDateString()}</td>
            <td>{merit.student_name}</td>
            <td>{merit.teacher_name}</td>
            <td>{merit.subject}</td>
            <td>{merit.category}</td>
            <td>{merit.type}</td>
            <td>{merit.details}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th>id</th>
          <th>Incident Date</th>
          <th>Student</th>
          <th>Teacher</th>
          <th>Subject</th>
          <th>Category</th>
          <th>Type</th>
          <th>Details</th>
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
