<script>
  // import ClubsAdminTable from "../components/ClubApprovalList.svelte";
  import Button from "../shared/Button.svelte";
  // import Radio from "../components/RadioAdmin.svelte";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  let submitted = false;
  let approvalType;
  let approvalObj = {
    recordId: "",
    email: "",
  };
  let buttonID = "submitApproval-btn";
  let buttonIDComp = "submitApproval-btn-comp";
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
  }

  function approvalResponse(response) {
    console.log("approved elements");
    response.approved.forEach((element) => console.table(element));
    console.table(response);
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Club Admin Page</h1>
<p class="mt-1">Page for approving clubs.</p>
<form on:submit|preventDefault={handleSubmit} id="clubAdmin">
  <fieldset>
    <div class="flex mt-2 ml-4">
      <div class="form-check form-check-inline mr-4">
        <input
          class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-600 bg-grey-200 checked:bg-green-600 checked:border-green-800 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer"
          type="radio"
          name="approvalType"
          id="approved_radio"
          value="approved"
          bind:group={approvalType}
          required
        />
        <label
          class="form-check-label inline-block cursor-pointer"
          class:text-green-800={approvalType == "approved"}
          for="approved_radio">Approved</label
        >
      </div>
      <div class="form-check form-check-inline mr-4">
        <input
          class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-600 bg-grey-200 checked:bg-red-600 checked:border-red-800 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer"
          type="radio"
          name="approvalType"
          id="rejected_radio"
          value="rejected"
          bind:group={approvalType}
        />
        <label
          class="form-check-label inline-block cursor-pointer"
          class:text-red-500={approvalType == "rejected"}
          for="rejected_radio">Rejected</label
        >
      </div>
    </div>
  </fieldset>
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
            class="text-green-500 rounded border-2 border-green-500 focus:ring-green-500 mr-2"
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
  {/if}
  <Button {buttonIDComp} {button_class} {submitted}>Submit</Button>
</form>
