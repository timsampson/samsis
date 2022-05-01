<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let titles = ["Club Name", "Enrolled", "Capacity", "Details", "Hats"];
  let clubList = {};
  let selected = {
    id: 0,
    name: "",
  };
  onMount(() => {
    google.script.run.withSuccessHandler(displayClubs).getClubList();
  });
  function displayClubs(clubsObjList) {
    clubList = clubsObjList;
    console.table(clubsObjList);
  }
  function handleSubmit() {
    google.script.run
      .withSuccessHandler(clubSubmissionResponse)
      .setRecordClubApplicationEntry(selected.id);
  }
  function clubSubmissionResponse(response) {
    console.log(response);
  }
</script>

<h2 class="text-lg ml-6 mb-1">Club Choices</h2>
<form on:submit|preventDefault={handleSubmit}>
  <div class="w-1/2">
    <!-- svelte-ignore a11y-no-onchange -->
    <select required bind:value={selected} class="w-full border rounded-lg focus:shadow-outline">
      <option value={() => (selected.name = "")} />
      {#each clubList as club}
        <option value={club}>
          {club.name}
        </option>
      {/each}
    </select>
  </div>

  <button
    type="submit"
    class="bg-blue-500 inline-flex items-center my-4 py-2 px-4 font-bold text-white transition-colors duration-150 
      hover:bg-blue-700 rounded-lg focus:shadow-outline disabled:opacity-50 disabled:bg-blue-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <span>Submit</span>
  </button>
</form>
<div class="mt-2 mx-auto p-4">
  <h1 class="text-2xl text-center text-blue-900">
    {#if clubList.length > 0}
      Below are the currently available clubs.
    {:else}
      Please wait for the available clubs to load.
    {/if}
  </h1>

  {#if clubList.length > 0}
    <table
      in:fade={{ duration: 1000 }}
      class="table table-auto mx-auto text-sm border-blue-800 border-4"
    >
      <thead>
        <tr class="bg-gradient-to-r from-blue-500 to-blue-600">
          {#each titles as title, i (titles[i])}
            <th class="capitalize text-white px-2 border border-blue-800">{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each clubList as club}
          <tr class="odd:bg-gray-200">
            <td class="mx-2 px-2 border border-blue-800">{club.name}</td>
            <td class="px-2 border border-blue-800 text-center">{club.enrolled}</td>
            <td class="px-2 border border-blue-800 text-center">{club.capacity}</td>
            <td class="mx-2  px-2 border border-blue-800">{club.description}</td>
            <td class="mx-2 px-2 border border-blue-800">{club.moderator}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
