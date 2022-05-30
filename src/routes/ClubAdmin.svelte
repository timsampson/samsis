<script>
  // import ClubsAdminTable from "../components/ClubApprovalList.svelte";
  import Button from "../shared/Button.svelte";
  // import Radio from "../components/RadioAdmin.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { fade } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import RadioAdmin from "../components/RadioAdmin.svelte";
  let selectedRecords = [];
  let submitted = false;
  let approvalType;
  $: console.log(approvalType);

  let buttonID = "submitApproval-btn";
  let button_class =
    "inline-flex items-center my-4 py-2 px-4 font-bold text-white transition-colors duration-150 rounded-lg focus:shadow-outline disabled:opacity-50";
  let recordsForApproval = [];
  let approvalElementList = [];
  let approvedArr = [];

  onMount(() => {
    google.script.run.withSuccessHandler(displayCurrentClub).getClubApprovalRecords();
  });
  function displayCurrentClub(approvalClubRecords) {
    approvalClubRecords.forEach((record, index) => {
      approvalClubRecords[index] = JSON.parse(record);
      approvalClubRecords[index].formSubmissionDate = new Date(
        approvalClubRecords[index].formSubmissionDate
      );
    });
    recordsForApproval = approvalClubRecords;
    console.table(recordsForApproval);
  }

  function handleSubmit() {
    submitted = false;
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
            recordId: recordsForApproval[i].recordId,
            email: recordsForApproval[i].email,
            isApproved: approvalType.toLowerCase().trim() === "approved" ? true : false,
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
    submitted = true;
    approvedArr = [];
    selectedRecords = [];
    approvalType = "";
  }

  function approvalResponse(response) {
    submitted = false;
    console.table(response);
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Club Admin Page</h1>
<p class="mt-1">Page for approving clubs.</p>
<form on:submit|preventDefault={handleSubmit} id="clubAdmin">
  <RadioAdmin bind:approvalType />
  {#if recordsForApproval.length > 0}
    <ul transition:fly class="p-2 mx-auto" required>
      {#each recordsForApproval as record, i (record.recordId)}
        <li
          id={record.recordId}
          class="border-b-2 border-blue-200 pt-2 pb-1"
          transition:slide|local={{ delay: 250, duration: 300, easing: quintOut }}
        >
          <input
            id={i + "approve"}
            type="checkbox"
            class="mr-2 cursor-pointer text-white"
            class:accent-red-700={approvalType == "rejected"}
            class:accent-green-700={approvalType == "approved"}
            name="approvals"
            bind:group={selectedRecords}
            value={record}
          />
          <label
            for={i + "approve"}
            class="ml-2 py-1 text-sm cursor-pointer"
            class:italic={!record.hasCapacity}
            >{record.name} in homeroom {record.homeroom} grade
            {record.grade} would like to join the
            <strong class="text-red-500">{record.hasCapacity ? "" : "full"}</strong>
            {record.appliedClubName} club.</label
          >
        </li>
      {/each}
    </ul>
  {/if}
  <Button {buttonID} {button_class} {submitted}>Submit</Button>
</form>

<h2 transition:fade class="m-2 text-blue-800 text-lg">
  {selectedRecords.length <= 0 ? "No Records Selected" : "Selected Records"}
</h2>
{#if selectedRecords.length > 0}
  <ul transition:fade>
    {#each selectedRecords as record}
      <li
        class="my-2"
        class:text-red-500={approvalType == "rejected"}
        class:text-green-800={approvalType == "approved"}
      >
        {record.name} in homeroom {record.homeroom} grade
        {record.grade} would like to join the
        <strong class="text-red-500">{record.hasCapacity ? "" : "full"}</strong>
        {record.appliedClubName} club.
      </li>
    {/each}
  </ul>
{/if}
