<script>
  import { onMount } from "svelte";
  import ClubsTable from "../components/Club/ClubTable.svelte";
  import ClubSelectionForm from "../components/Club/ClubSelectionForm.svelte";

  export let titles = ["Club Name", "Enrolled", "Capacity", "Details", "Moderators"];
  import { club_list } from "../stores/clubStore.js";
  onMount(() => {
    google.script.run.withSuccessHandler(displayClubs).getClubsFilteredByLevel();
  });
  function displayClubs(clubsObjList) {
    club_list.set(clubsObjList);
    console.table($club_list);
  }
</script>

<div class="m-2">
  <h1 class="text-xl">Sign Up</h1>
  <ClubSelectionForm />
  <h1 class="text-2xl text-center text-blue-900">
    {#if $club_list.length > 0}
      Below are the currently available clubs.
    {:else}
      Please wait for the available clubs to load.
    {/if}
  </h1>
  <ClubsTable {titles} />
</div>
