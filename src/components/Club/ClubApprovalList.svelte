<script>
  import { approvalRecords } from "../stores/clubAdminStore.js";
</script>

<div>
  {#if $approvalRecords.length > 0}
    <ul class="p-2 mx-auto">
      {#each $approvalRecords as record, i (record.record_id)}
        <li
          id={record.record_id}
          name="approvalRecord"
          class="border-b-2 border-blue-200 pt-2 pb-1"
        >
          <input
            id={i + "approve"}
            type="checkbox"
            class="text-orange-500 rounded border-2 border-orange-500 focus:ring-orange-500 mr-2"
            name="approvals"
          />
          <label
            for={record.record_id}
            class="ml-2 py-1 text-sm"
            class:italic={!record.has_capacity}
            >{record.student_name} in homeroom {record.homeroom} grade
            {record.grade} would like to join the
            <strong class="text-red-500">{record.has_capacity ? "" : "full"}</strong>
            {record.club_name} club.</label
          >
        </li>
      {/each}
    </ul>
  {:else}
    <h1 class="text-2xl text-blue-800">No records awaiting approval</h1>
  {/if}
</div>
