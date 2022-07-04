<script>
  import MeritSearch from "../components/MeritForm/MeritSearch.svelte";
  import MeritSearchTable from "../components/MeritForm/MeritSearchTable.svelte";
  import MeritCategories from "../components/MeritForm/MeritCategories.svelte";
  import MeritDate from "../components/MeritForm/MeritDate.svelte";
  import MeritNextBtn from "../components/MeritForm/MeritNextBtn.svelte";
  import MeritSubmissionDisplay from "../components/MeritForm/MeritSubmissionDisplay.svelte";
  import MeritSubject from "../components/MeritForm/MeritSubject.svelte";
  import {
    stepOneComplete,
    selectedStudents,
    meritDetails,
    selectedCategory,
    meritFormComplete,
    meritBehaviors,
    meritDateValue,
    dateIsSelected,
    meritFormSubmitted,
    selectedSubject,
  } from "../stores/meritStore.js";
  const meritResponse = {
    behaviorCategory: "",
    meritBehaviors: [],
    meritDetails: "",
    selectedStudents: [],
    selectedDate: "",
  };
  // $: console.log(`stepOneComplete: ${$stepOneComplete}`);
  // $: console.log(`$meritDateValue: ${$meritDateValue}`);
  function handleSubmit() {
    meritResponse.behaviorCategory = $selectedCategory;
    meritResponse.meritBehaviors = $meritBehaviors;
    meritResponse.meritDetails = $meritDetails;
    meritResponse.selectedStudents = $selectedStudents;
    meritResponse.selectedDate = $meritDateValue;
    // console.log(`meritResponse:`);
    // console.table(meritResponse);
    // console.log("handleSubmit");
    meritFormSubmitted.set(true);
    //let meritRecord = JSON.stringify(meritResponse);
    google.script.run.withSuccessHandler(meritSubmissionResponse).meritSubmission(meritResponse);
  }
  function meritSubmissionResponse(response) {
    console.log(`meritSubmissionResponse:`);
    console.table(response);
  }
  function resetForm() {
    meritFormSubmitted.set(false);
    stepOneComplete.set(false);
    selectedStudents.set([]);
    selectedCategory.set([]);
    meritDetails.set("");
    meritDateValue.set("");
    dateIsSelected.set(false);
    meritBehaviors.set([]);
  }
</script>

<div class="container mx-auto">
  <h1 class="text-xl">Merit Form Page</h1>
  {#if !$meritFormSubmitted}
    <form on:submit|preventDefault={handleSubmit}>
      {#if !$stepOneComplete}
        <section>
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid lg:grid-cols-4 gap-2 md:grid-cols-2">
                <div class="flex-none">
                  <MeritSearch />
                </div>
                <div class="flex-none">
                  <MeritDate />
                </div>
                <div class="flex-none">
                  <MeritSubject />
                </div>
                <div class="flex-none">
                  {#if $selectedStudents.length > 0 && $dateIsSelected && $selectedSubject != ""}
                    <MeritNextBtn />
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <MeritSearchTable />
        </section>
      {:else}
        <section>
          <button
            on:click={() => stepOneComplete.set(false)}
            type="button"
            class="ml-2 mt-2 btn btn-sm btn-primary bg-warning">Back</button
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
              placeholder="Write the details here."
              bind:value={$meritDetails}
              required
            />
          </div>
        </section>
      {/if}
      {#if $meritFormComplete}
        <button type="submit" class="ml-2 mt-2 btn btn-sm btn-primary bg-success">Submit</button>
      {/if}
    </form>
  {:else}
    <p class="text-lg ">Thank you for submitting your merit form.</p>
    <button
      on:click={resetForm}
      type="button"
      class="ml-2 mt-2 btn btn-sm btn-wide btn-primary bg-warning">Start a new submission</button
    >
    <MeritSubmissionDisplay />
    <pre>{JSON.stringify(meritResponse)}</pre>
  {/if}
</div>
