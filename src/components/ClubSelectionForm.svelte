<script>
  import { onMount } from "svelte";
  import { InlineNotification } from "carbon-components-svelte";
  export let clubList;
  let clubFormState = {
    showNotice: false,
    formIsClosed: true,
    submitted: false,
    notificationKind: "info",
  };

  onMount(() => {
    google.script.run.withSuccessHandler(displayUserClubFormState).getUserClubState();
  });
  function displayUserClubFormState(updatedclubFormState) {
    clubFormState = updatedclubFormState;
    isFormClosed();
    console.log("clubFormState");
    console.table(clubFormState);
  }
  let selected = {
    id: 0,
    name: "",
  };
  function handleSubmit() {
    clubFormState.showNotice = true;
    clubFormState.submitted = true;
    isFormClosed();
    google.script.run
      .withSuccessHandler(clubSubmissionResponse)
      .clubApplicationSubmission(selected.id);
  }
  function clubSubmissionResponse(response) {
    let responseDetails = JSON.parse(response);
    responseDetails.formSubmissionDate = new Date(responseDetails.formSubmissionDate);
    console.table(responseDetails);
  }
  function isFormClosed() {
    console.log(`clubFormState.formIsClosed: ${clubFormState.formIsClosed}`);
    console.log(`clubFormState.isInClub: ${clubFormState.isInClub}`);
    console.log(`clubFormState.formState: ${clubFormState.formState}`);
    if (clubFormState.submitted == true) {
      clubFormState.showNotice = true;
      clubFormState.notificationKind = "success";
      clubFormState.formIsClosed = true;
      clubFormState.applicationMessage = `Thanks for your application to the ${selected.name} club!`;
    } else if (
      clubFormState.formState == "closed" ||
      clubFormState.formState == "view" ||
      clubFormState.submitted == true ||
      clubFormState.formState == "" ||
      clubFormState.formState == null ||
      clubFormState.formState == undefined
    ) {
      clubFormState.notificationKind = "error";
      clubFormState.formIsClosed = true;
      clubFormState.showNotice = true;
      clubFormState.applicationMessage = "The form is currently closed.";
    } else if (clubFormState.formState == "submit") {
      clubFormState.notificationKind = "success";
      clubFormState.showNotice = true;
      if (clubFormState.isInClub == true) {
        clubFormState.formIsClosed = true;
        clubFormState.applicationMessage = `You are currently enrolled in the ${clubFormState.currentClubName} club. Changes are not allowed at this time.`;
      } else {
        clubFormState.formIsClosed = false;
        clubFormState.applicationMessage = `Please choose a club from the list below.`;
      }
    } else if (clubFormState.formState == "edit") {
      clubFormState.notificationKind = "success";
      clubFormState.showNotice = true;
      clubFormState.notificationKind = "info";
      if (clubFormState.isInClub == true) {
        clubFormState.formIsClosed = false;
        clubFormState.applicationMessage = `You are currently enrolled in the ${clubFormState.currentClubName} club. You may choose a new club from the list below as long as it is not full.`;
      } else {
        clubFormState.formIsClosed = false;
        clubFormState.applicationMessage = `Please choose a club from the list below.`;
      }
    } else if (clubFormState.formState == "approval") {
      clubFormState.notificationKind = "warning";
      clubFormState.showNotice = true;
      if (clubFormState.isInClub == true) {
        clubFormState.formIsClosed = false;
        clubFormState.applicationMessage = `You are currently enrolled in the ${clubFormState.currentClubName} club. If you choose a new club, it needs to be approved by the administrator before you can join.`;
      } else {
        clubFormState.formIsClosed = false;
        clubFormState.applicationMessage = `Please choose a club from the list below. It needs to be approved by the administrator before you can join.`;
      }
    } else {
      clubFormState.showNotice = true;
      clubFormState.formIsClosed = false;
      clubFormState.applicationMessage = `Please contact your club administrator.`;
      clubFormState.notificationKind = "error";
    }
  }
</script>

{#if clubFormState.showNotice}
  <InlineNotification
    lowContrast
    kind={clubFormState.notificationKind}
    title="Notice:"
    subtitle={clubFormState.applicationMessage}
  />
{/if}
<div>
  <h2 class="text-lg mb-1">Club Choices</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="w-80">
      <!-- svelte-ignore a11y-no-onchange -->
      <select
        required
        on:change={() => isFormClosed()}
        bind:value={selected}
        class="w-full pl-1 py-1 border rounded-lg focus:shadow-outline"
      >
        <option value={() => (selected.name = "")} />
        {#each clubList as club}
          <option value={club}>
            {club.name}
          </option>
        {/each}
      </select>
    </div>
    <button
      type="submit"
      class="bg-blue-500 inline-flex items-center my-4 py-2 px-4 font-bold text-white
      hover:bg-blue-700 rounded-lg focus:shadow-outline disabled:opacity-50 disabled:bg-blue-300"
      disabled={clubFormState.formIsClosed}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span>Submit</span>
    </button>
  </form>
</div>
