<script>
  // import ClubsAdminTable from "../components/ClubApprovalList.svelte";
  import Button from "../shared/Button.svelte";
  // import Radio from "../components/RadioAdmin.svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import RadioAdmin from "../components/RadioAdmin.svelte";
  let submitted = false;
  let approvalType;
  let approvalObj = {
    recordId: "",
    email: "",
  };
  let buttonID = "submitApproval-btn";
  let button_class =
    "inline-flex items-center my-4 py-2 px-4 font-bold text-white transition-colors duration-150 rounded-lg focus:shadow-outline disabled:opacity-50";
  let records = [];
  let approvals = [];
  let approved = [];

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
    records = approvalClubRecords;
    console.table(records);
  }

  function handleSubmit() {
    submitted = false;
    approvals = document.getElementsByName("approvals");
    console.log(approvals.length);
    if (approvals.length > 0) {
      for (var i = records.length - 1; i >= 0; i--) {
        if (approvals[i].checked) {
          approvalObj.recordId = records[i].recordId;
          approvalObj.email = records[i].email;
          console.table(approvalObj);
          approved.push(approvalObj);
          approvals[i].checked = false;
          records.splice(i, 1);
        }
        records = records;
      }
    } else {
      alert("Please select at least one record to approve");
      return;
    }
    google.script.run
      .withSuccessHandler(approvalResponse)
      .processReviewedClubApplications({ approved, approvalType });

    console.log("approval type: " + approvalType);
    document.getElementById("clubAdmin").reset();
    approvalType = "Has been reset";
    console.log("approval type: " + approvalType);
    submitted = true;
    console.log("submitted: " + submitted);
    approved = [];
    selectedRecords = [];
  }

  function approvalResponse(response) {
    console.log("approved elements");
    response.approved.forEach((element) => console.table(element));
    console.table(response);
  }
  let selectedRecords = [];
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Club Admin Page</h1>
<p class="mt-1">Page for approving clubs.</p>
<form on:submit|preventDefault={handleSubmit} id="clubAdmin">
  <RadioAdmin bind:approvalType />
  {#if records.length > 0}
    <ul class="p-2 mx-auto" required>
      {#each records as record, i (record.recordId)}
        <li
          id={record.recordId}
          class="border-b-2 border-blue-200 pt-2 pb-1"
          transition:slide|local={{ delay: 250, duration: 300, easing: quintOut }}
        >
          <input
            id={i + "approve"}
            type="checkbox"
            class="text-green-500 rounded border-2 border-green-500 focus:ring-green-500 mr-2 cursor-pointer"
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

<h2 class="m-4 underline text-blue-700 text-xl">Selected Records:</h2>
{#if selectedRecords.length > 0}
  <ul>
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
