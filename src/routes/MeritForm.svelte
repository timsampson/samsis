<script>
  import MeritSearch from "../components/MeritForm/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritForm/MeritSearchTable.svelte";
  import MeritCategories from "../components/MeritForm/MeritCategories.svelte";
  import {
    meritFormStepOneSelect,
    selectedData,
    details,
    selectedCategory,
    meritFormComplete,
    behaviors,
  } from "../stores/meritStore.js";

  const meritResponse = {
    behaviorCategory: "",
    behaviors: [],
    details: "",
    selectedStudents: [],
  };
  $: console.log(`meritFormStepOneSelect: ${$meritFormStepOneSelect}`);
  $: console.log(`Details: ${$details}`);
  function handleSubmit() {
    meritResponse.behaviorCategory = $selectedCategory;
    meritResponse.behaviors = $behaviors;
    meritResponse.details = $details;
    meritResponse.selectedStudents = $selectedData;
    console.log(`meritResponse:`);
    console.table(meritResponse);
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
      <button type="submit" class="ml-2 mt-2 btn btn-primary">Submit</button>
    {/if}
  </form>
</div>
