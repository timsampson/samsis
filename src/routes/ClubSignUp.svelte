<script>
  import ClubsTable from "../components/ClubTable.svelte";
  import ClubSelectionForm from "../components/clubSelectionForm.svelte";
  import { onMount } from "svelte";

  export let titles = ["Club Name", "Enrolled", "Capacity", "Details", "Moderators"];
  export let clubList = {};

  onMount(() => {
    google.script.run.withSuccessHandler(displayClubs).getClubsFilteredByLevel();
  });
  function displayClubs(clubsObjList) {
    clubList = clubsObjList;
    console.table(clubsObjList);
  }
</script>

<h1 class="text-indigo-600 text-3xl font-bold ">Sign Up</h1>
<ClubSelectionForm {clubList} />
<ClubsTable {titles} {clubList} />
