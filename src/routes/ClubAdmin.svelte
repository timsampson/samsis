<script>
  import ClubsAdminTable from "../components/ClubAdminTable.svelte";
  import Button from "../shared/Button.svelte";
  import { onMount } from "svelte";
  export let approvalRecords = [];
  export let titles = [
    "Name",
    "Student Id",
    "Date",
    "Club ID",
    "Club Name",
    "Approved",
    "Grade",
    "Homeroom",
  ];

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
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Club Admin Page</h1>
<p class="mt-1">Page for approving clubs.</p>
<Button>Approve</Button>
<Button>Reject</Button>

<ClubsAdminTable {titles} {approvalRecords} />
