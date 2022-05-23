<script>
  import { fade } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  export let approvalRecords = [];
</script>

<!-- Language: svelte -->
<div>
  {#if approvalRecords.length > 0}
    <ul class="p-2 mx-auto">
      {#each approvalRecords as record, i (record.recordId)}
        <li
          id={record.recordId}
          class="border-b-2 border-blue-200 pt-2 pb-1"
          transition:slide|local={{ delay: 250, duration: 300, easing: quintOut }}
        >
          <input
            id={i + "approve"}
            type="checkbox"
            class="text-orange-500 rounded border-2 border-orange-500 focus:ring-orange-500 mr-2"
            name="approvals"
          />
          <label for={record.recordId} class="ml-2 py-1 text-sm" class:italic={!record.hasCapacity}
            >{record.name} in homeroom {record.homeroom} grade
            {record.grade} would like to join the
            <strong class="text-red-500">{record.hasCapacity ? "" : "full"}</strong>
            {record.appliedClubName} club.</label
          >
        </li>
      {/each}
    </ul>
  {:else}
    <h1 class="text-2xl text-blue-800">No records awaiting approval</h1>
  {/if}
</div>
