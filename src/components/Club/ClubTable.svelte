<script>
  import { fade } from "svelte/transition";
  import { club_list } from "../../stores/clubStore.js";
  export let titles;
</script>

<div class="overflow-x-auto">
  {#if $club_list.length > 0}
    <table class="table table-compact w-full table-zebra" in:fade|local={{ duration: 1000 }}>
      <thead>
        <tr>
          {#each titles as title, i (titles[i])}
            <th>{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $club_list as club}
          <tr>
            <td>{club.club_name}</td>
            <td>{club.enrolled}</td>
            <td>{club.capacity}</td>
            <td>{club.description}</td>
            <td>{club.moderator_name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
