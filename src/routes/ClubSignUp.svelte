<script>
  import ClubsTable from "../components/ClubTable.svelte";
  import ClubSelectionForm from "../components/clubSelectionForm.svelte";
  import { onMount } from "svelte";

  export let titles = ["Club Name", "Enrolled", "Capacity", "Details", "Moderators"];
  export let clubList = {};
  export let clubState = {};
  onMount(() => {
    google.script.run.withSuccessHandler(displayClubs).getClubsFilteredByLevel();
    google.script.run.withSuccessHandler(displayUserClubState).getUserClubState();
  });
  function displayClubs(clubsObjList) {
    clubList = clubsObjList;
    console.table(clubsObjList);
  }
  function displayUserClubState(updatedclubState) {
    clubState = updatedclubState;
    console.log("clubState");
    console.table(clubState);
  }
</script>

<div class="ml-8">
  <h1 class="text-indigo-600 text-3xl font-bold ">Sign Up</h1>
  <ClubSelectionForm {clubList} {clubState} />
  <h1 class="text-2xl text-center text-blue-900">
    {#if clubList.length > 0}
      Below are the currently available clubs.
    {:else}
      Please wait for the available clubs to load.
    {/if}
  </h1>
  <ClubsTable {titles} {clubList} />
</div>
