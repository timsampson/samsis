<script>
  import { fade } from "svelte/transition";
  import { term } from "../stores/meritStore.js";
  import { category } from "../stores/meritStore.js";
  let searchCategories = ["Id", "Name", "Homeroom", "Teacher", "Grade", "School"];
  let val = "";
  $: term.set(val.toLowerCase().trim());
  $: console.log(JSON.stringify(term));
  $: console.log(JSON.stringify(category));
</script>

<table class="table table-compact w-full" in:fade|local={{ duration: 1000 }}>
  <thead>
    <tr>
      {#each searchCategories as searchCategory}
        <th>{searchCategory}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    <tr class="odd:bg-gray-200">
      <td>
        <input
          type="search"
          id="student_name"
          placeholder="Type here"
          class="input w-full max-w-xs"
          on:forminput={(e) => {
            category.set(e.target.id);
          }}
          bind:value={val}
        />
      </td>
    </tr>
  </tbody>
</table>
