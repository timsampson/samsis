<script>
  import { fade } from "svelte/transition";
  export let clubList;
  export let titles;
</script>

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
