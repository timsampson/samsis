<script>
  import MeritSearch from "../components/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritSearchTable.svelte";
  import MeritCategories from "../components/MeritCategories.svelte";
  import {
    meritFormStepOneSelect,
    selectedData,
    details,
    selectedCategory,
    meritFormComplete,
  } from "../stores/meritStore.js";

  let meritResponse = {
    behaviorCategory: $selectedCategory,
    positive: [],
    information: [],
    level: [],
    YC: [],
    OC: [],
    RC: [],
  };
  $: console.log(` meritFormStepOneSelect: ${$meritFormStepOneSelect}`);
  $: console.log(`Details: ${$details}`);
  function handleSubmit() {
    console.log("handleSubmit");
  }
</script>

<h1 class="text-xl">Merit Form Page</h1>
<div class="container mx-auto">
  <form on:submit|preventDefault={handleSubmit}>
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
{#if $selectedCategory.length > 1}
  <section>
    <div class="ml-2 mt-4">
      <textarea
        class="textarea textarea-primary min-w-full"
        placeholder="Details"
        bind:value={$details}
      />
    </div>
  </section>
{/if}
{#if $meritFormComplete}
  <button type="sumbit" class="ml-2 mt-2 btn btn-primary">Submit</button>
{/if}
