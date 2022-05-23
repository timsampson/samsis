<script>
  import ClubsAdminTable from "../components/ClubApprovalList.svelte";
  import Button from "../shared/Button.svelte";
  import Radio from "../components/RadioAdmin.svelte";
  import { onMount } from "svelte";
  let submitted = false;

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
    console.log(event);
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Club Admin Page</h1>
<p class="mt-1">Page for approving clubs.</p>
<form on:submit|preventDefault={handleSubmit}>
  <Radio />
  <ClubsAdminTable {approvalRecords} />
  <Button {submitted} {handleSubmit} id="submit">Submit</Button>
</form>
