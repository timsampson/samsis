<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import RadioAdmin from "../components/Club/RadioAdmin.svelte";
  import { canSubmit, submitted, approvalType } from "../stores/clubAdminStore.js";
  let selectedRecords = [];
  $: console.log($approvalType);
  let recordsForApproval = [];
  let approvalElementList = [];
  let approvedArr = [];

  onMount(() => {
    google.script.run.withSuccessHandler(displayCurrentClub).getClubApprovalRecords();
  });
  function displayCurrentClub(approvalClubRecords) {
    approvalClubRecords.forEach((record, index) => {
      approvalClubRecords[index] = JSON.parse(record);
      approvalClubRecords[index].submission_date = new Date(
        approvalClubRecords[index].submission_date
      );
    });
    recordsForApproval = approvalClubRecords;
    console.table(recordsForApproval);
  }
  function checkIfSelected() {
    for (let i = 0; i < approvalElementList.length; i++) {
      if (approvalElementList[i].checked) canSubmit.set(true);
    }
  }
  function handleSubmit() {
    submitted.set(false);
    approvalElementList = document.getElementsByName("approvals");
    let numChecked = 0;
    for (let i = 0; i < approvalElementList.length; i++) {
      if (approvalElementList[i].checked) numChecked++;
    }
    if (numChecked === 0) {
      alert("Please select at least one record to approve");
      return;
    }
    if (approvalElementList.length > 0) {
      for (var i = approvalElementList.length - 1; i >= 0; i--) {
        // starting with last element
        if (approvalElementList[i].checked) {
          let approvalObj = {
            record_id: recordsForApproval[i].record_id,
            email: recordsForApproval[i].email,
            review_status: $approvalType,
          };
          approvedArr.push(approvalObj);
          approvalElementList[i].checked = false;
          recordsForApproval.splice(i, 1);
          recordsForApproval = recordsForApproval;
        }
      }
    }
    console.log("approved Array for submission is: ");
    console.table(approvedArr);
    google.script.run
      .withSuccessHandler(approvalResponse)
      .processReviewedClubApplications(approvedArr);
    document.getElementById("clubAdmin").reset();
    submitted.set(true);
    approvedArr = [];
    selectedRecords = [];
    approvalType.set("");
  }

  function approvalResponse(response) {
    submitted.set(false);
    console.table(response);
  }
</script>

<div class="container mx-auto">
  <h1 class="text-xl">Club Admin Page</h1>
  <p class="mt-1">Page for approving clubs.</p>
  <form on:submit|preventDefault={handleSubmit} id="clubAdmin">
    <RadioAdmin bind:$approvalType />
    {#if recordsForApproval.length > 0}
      <ul in:fade|local={{ duration: 1000 }} class="p-2 mx-auto" required>
        {#each recordsForApproval as record, i (record.record_id)}
          <li id={record.record_id} class="border-b-2 border-blue-200 pt-2 pb-1">
            <input
              id={i + "approve"}
              type="checkbox"
              class="mr-2 cursor-pointer text-white"
              class:accent-red-700={$approvalType == "rejected"}
              class:accent-green-700={$approvalType == "approved"}
              name="approvals"
              bind:group={selectedRecords}
              value={record}
            />
            <label
              for={i + "approve"}
              class="ml-2 py-1 text-sm cursor-pointer"
              class:italic={!record.has_capacity}
              >{record.student_name} in homeroom {record.homeroom} grade
              {record.grade} would like to join the
              <strong class="text-red-500">{record.has_capacity ? "" : "full"}</strong>
              {record.club_name} club.</label
            >
          </li>
        {/each}
      </ul>
    {/if}
    <button type="submit" class="btn btn-primary btn-sm mt-3" disabled={$submitted}>submit</button>
  </form>

  <h2 class="m-2 text-blue-800 text-lg">
    {selectedRecords.length <= 0 ? "No Records Selected" : "Selected Records"}
  </h2>
  {#if selectedRecords.length > 0}
    <ul in:fade|local={{ duration: 1000 }}>
      {#each selectedRecords as record}
        <li
          class="my-2"
          class:text-red-500={$approvalType == "rejected"}
          class:text-green-800={$approvalType == "approved"}
        >
          {record.student_name} in homeroom {record.homeroom} grade
          {record.grade} would like to join the
          <strong class="text-red-500">{record.has_capacity ? "" : "full"}</strong>
          {record.club_name} club.
        </li>
      {/each}
    </ul>
  {/if}
</div>
