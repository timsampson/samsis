<script>
  import MeritSearch from "../components/Merit/MeritSearch.svelte";
  import MeritSearchTable from "../components/Merit/MeritSearchTable.svelte";
  import MeritCategories from "../components/Merit/MeritCategories.svelte";
  import MeritBehaviors from "../components/Merit/MeritBehaviors.svelte";
  import MeritDate from "../components/Merit/MeritDate.svelte";
  import MeritNextBtn from "../components/Merit/MeritNextBtn.svelte";
  import MeritSubmissionDisplay from "../components/Merit/MeritSubmissionDisplay.svelte";
  import MeritSubject from "../components/Merit/MeritSubject.svelte";
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
  function handleSubmit() {
    meritResponse.behaviorCategory = $selectedCategory;
    meritResponse.meritBehaviors = $meritBehaviors;
    meritResponse.meritDetails = $meritDetails;
    meritResponse.selectedStudents = $selectedStudents;
    console.log(`$meritDateValue ${$meritDateValue}`);
    meritResponse.selectedDate = $meritDateValue;
    meritFormSubmitted.set(true);
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
    selectedCategory.set("");
    meritBehaviors.set([]);
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
              <div class="grid lg:grid-cols-4 gap-2 md:grid-cols-2 sm:grid-cols-1">
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
          <p>Now choose the behaviorCategories</p>
          <div class="grid grid-cols-3 gap-4">
            <MeritCategories />
            <MeritBehaviors />
          </div>
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
