<script>
  import { fade } from "svelte/transition";
  export let meritValues = [];
</script>

<div class="overflow-x-auto">
  <table class="table table-compact w-full table-zebra" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th>Date</th>
        <th>Student</th>
        <th>Teacher</th>
        <th>Category</th>
        <th>Type</th>
        <th>Details</th>
      </tr>
    </thead>
    {#if meritValues.length > 0}
      <tbody>
        {#each meritValues as merit}
          <tr>
            <td>{merit.timestamp.toLocaleDateString()}</td>
            <td>{merit.student_name}</td>
            <td>{merit.teacher_name}</td>
            <td>{merit.categories}</td>
            <td>{merit.type}</td>
            <td>{merit.details}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th>Date</th>
          <th>Student</th>
          <th>Teacher</th>
          <th>Category</th>
          <th>Type</th>
          <th>Details</th>
        </tr>
      </tfoot>
    {/if}
  </table>
</div>
