<script>
  import MeritSearch from "../components/MeritForm/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritForm/MeritSearchTable.svelte";
  import MeritCategories from "../components/MeritForm/MeritCategories.svelte";
  import MeritDate from "../components/MeritForm/MeritDate.svelte";
  import MeritNextBtn from "../components/MeritForm/MeritNextBtn.svelte";
  import {
    stepOneComplete,
    selectedData,
    details,
    selectedCategory,
    meritFormComplete,
    behaviors,
    meritDateValue,
    dateIsSelected,
  } from "../stores/meritStore.js";
  let meritFormSubmitted = false;
  const meritResponse = {
    behaviorCategory: "",
    behaviors: [],
    details: "",
    selectedStudents: [],
    selectedDate: {},
  };
  $: console.log(`stepOneComplete: ${$stepOneComplete}`);
  $: console.log(`$meritDateValue: ${$meritDateValue}`);
  function handleSubmit() {
    meritResponse.behaviorCategory = $selectedCategory;
    meritResponse.behaviors = $behaviors;
    meritResponse.details = $details;
    meritResponse.selectedStudents = $selectedData;
    meritResponse.selectedDate = $meritDateValue;
    console.log(`meritResponse:`);
    console.table(meritResponse);
    console.log("handleSubmit");
    meritFormSubmitted = true;
  }
  function resetForm() {
    meritFormSubmitted = false;
    stepOneComplete.set(false);
    selectedData.set([]);
    selectedCategory.set([]);
    details.set("");
    meritDateValue.set({});
    dateIsSelected.set(false);
  }
</script>

<div class="container mx-auto">
  <h1 class="text-xl">Merit Form Page</h1>
  {#if !meritFormSubmitted}
    <form on:submit|preventDefault={handleSubmit}>
      {#if !$stepOneComplete}
        <section>
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <MeritSearch />
                </div>
                <div>
                  <MeritDate />
                </div>
                <div>
                  {#if $selectedData.length > 0 && $dateIsSelected}
                    <MeritNextBtn />
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <StudentHRTable />
        </section>
      {:else}
        <section>
          <button
            on:click={() => stepOneComplete.set(false)}
            type="button"
            class="ml-2 mt-2 btn btn-primary">Back</button
          >
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
  {:else}
    <p>Thank you for submitting your merit form.</p>
    <button on:click={resetForm} type="button" class="ml-2 mt-2 btn btn-primary">New Form</button>
  {/if}
</div>
