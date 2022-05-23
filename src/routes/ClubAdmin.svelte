<script>
  import ClubsAdminTable from "../components/ClubApprovalList.svelte";
  import Button from "../shared/Button.svelte";
  import Radio from "../components/RadioAdmin.svelte";
  import { onMount } from "svelte";
  let submitted = false;
  let buttonID = "submitApproval-btn";
  let selectedRecords = [];
  let approvalType;
  export let approvalRecords = [];

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
    approvalRecords = approvalClubRecords;
    console.table(approvalRecords);
  }
  function handleSubmit(event) {
    selectedRecords = document.getElementsByName("approvalRecord");
    let approved = document.getElementById("approved_radio");
    let rejected = document.getElementById("rejected_radio");
    if (approved.checked) {
      approvalType = "approved";
    } else if (rejected.checked) {
      approvalType = "rejected";
    }
    console.log("approval type: " + approvalType);

    document.getElementById("clubAdmin").reset();
    console.log(event);
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Club Admin Page</h1>
<p class="mt-1">Page for approving clubs.</p>
<form on:submit|preventDefault={handleSubmit} id="clubAdmin">
  <Radio />
  <ClubsAdminTable {approvalRecords} />
  <Button {submitted} {handleSubmit} {buttonID}>Submit</Button>
</form>
