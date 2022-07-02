<script>
  import MeritSearch from "../components/MeritForm/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritForm/MeritSearchTable.svelte";
  import MeritCategories from "../components/MeritForm/MeritCategories.svelte";
  import MeritDate from "../components/MeritForm/MeritDate.svelte";
  import MeritNextBtn from "../components/MeritForm/MeritNextBtn.svelte";
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
    console.log(`meritResponse:`);
    console.table(meritResponse);
    console.log("handleSubmit");
    meritFormSubmitted.set(true);
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
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <MeritSearch />
                </div>
                <div>
                  <MeritDate />
                </div>
                <div>
                  {#if $selectedStudents.length > 0 && $dateIsSelected}
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
            class="ml-2 mt-2 btn btn-primary bg-warning">Back</button
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
              placeholder="meritDetails"
              bind:value={$meritDetails}
            />
          </div>
        </section>
      {/if}
      {#if $meritFormComplete}
        <button type="submit" class="ml-2 mt-2 btn btn-primary bg-success">Submit</button>
      {/if}
    </form>
  {:else}
    <p class="text-lg ">Thank you for submitting your merit form.</p>
    <button on:click={resetForm} type="button" class="ml-2 mt-2 btn btn-primary bg-warning"
      >New Form</button
    >
    <p class="text-xl">Your submission included the following details.</p>
    <p><span class="font-semibold">Merit Category: </span>{$selectedCategory}</p>
    <p class="font-semibold">Incident date: {$meritDateValue}</p>
    <p>Students in report:</p>
    <ul>
      {#each $selectedStudents as student, i}
        <li>
          <span class="font-semibold">{i + 1}) </span>{student.student_id}, {student.student_name}
        </li>
      {/each}
    </ul>
    <p><span class="font-semibold">Merit Details: </span>{$meritDetails}</p>
  {/if}
</div>
