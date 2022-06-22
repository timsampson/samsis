<script>
  import { fade } from "svelte/transition";
  export let clubList;
  export let titles;
</script>

<div class="overflow-x-auto">
  {#if clubList.length > 0}
    <table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
      <thead>
        <tr>
          {#each titles as title, i (titles[i])}
            <th>{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each clubList as club}
          <tr class="odd:bg-gray-200">
            <td>{club.name}</td>
            <td>{club.enrolled}</td>
            <td>{club.capacity}</td>
            <td>{club.description}</td>
            <td>{club.moderator}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
