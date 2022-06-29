<script>
  import MeritSearch from "../components/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritSearchTable.svelte";
  import MeritCategories from "../components/MeritCategories.svelte";
  import { meritFormStepOneSelect, selectedData } from "../stores/meritStore.js";
  $: console.log(` meritFormStepOneSelect: ${$meritFormStepOneSelect}`);
</script>

<h1 class="text-xl">Merit Form Page</h1>
<div class="container mx-auto">
  <form>
    {#if $meritFormStepOneSelect}
      <section>
        <MeritSearch />
        {#if $selectedData.length > 0}
          <button
            on:click={() => meritFormStepOneSelect.set(false)}
            type="button"
            class="ml-2 btn btn-primary">Next</button
          >
        {/if}
      </section>
      <section>
        <StudentHRTable />
      </section>
    {:else}
      <section>
        <p>Now choose the categories</p>
        <MeritCategories />
      </section>
    {/if}
  </form>
</div>
