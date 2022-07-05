<script>
  import { onMount } from "svelte";
  import {
    club_list,
    show_notice,
    form_is_closed,
    submitted,
    notification_kind,
    form_edit_state,
    is_in_club,
    application_message,
    is_moderator,
    is_student,
    homeroom,
    current_club_name,
    current_club_id,
    user_role,
    email,
    school,
    grade,
    student_name,
  } from "../../stores/clubStore.js";
  onMount(() => {
    google.script.run.withSuccessHandler(displayUserClubFormState).getUserClubState();
  });
  function displayUserClubFormState(formState) {
    console.log("formState");
    console.table(formState);
    show_notice.set(formState.show_notice);
    form_edit_state.set(formState.form_edit_state);
    is_in_club.set(formState.is_in_club);
    is_moderator.set(formState.is_moderator);
    homeroom.set(formState.homeroom);
    current_club_name.set(formState.current_club_name);
    user_role.set(formState.user_role);
    current_club_id.set(formState.current_club_id);
    school.set(formState.school);
    grade.set(formState.grade);
    student_name.set(formState.student_name);
    is_student.set(formState.is_student);
    email.set(formState.email);
    application_message.set(formState.club_message);
    console.log(`application_message: ${$application_message}`);
    console.log(`is_student: ${$is_student}`);
    console.log(`is_moderator: ${$is_moderator}`);
    console.log(`is_in_club: ${$is_in_club}`);
    console.log(`form_edit_state: ${$form_edit_state}`);
    console.log(`submitted: ${$submitted}`);
    console.log(`notification_kind: ${$notification_kind}`);
    console.log(`form_is_closed: ${$form_is_closed}`);
    console.log(`application_message: ${$application_message}`);
    console.log(`homeroom: ${$homeroom}`);
    console.log(`current_club_name: ${$current_club_name}`);
    console.log(`user_role: ${$user_role}`);
    console.log(`current_club_id: ${$current_club_id}`);
    console.log(`school: ${$school}`);
    console.log(`grade: ${$grade}`);
    console.log(`student_name: ${$student_name}`);
    console.log(`email: ${$email}`);

    isFormClosed();
  }
  let selected = {
    id: 0,
    club_name: "",
  };
  function handleSubmit() {
    show_notice.set(true);
    submitted.set(true);
    isFormClosed();
    google.script.run
      .withSuccessHandler(clubSubmissionResponse)
      .clubApplicationSubmission(selected.id);
  }
  function clubSubmissionResponse(response) {
    let responseDetails = JSON.parse(response);
    responseDetails.submission_date = new Date(responseDetails.submission_date);
    application_message.set(responseDetails.application_message);
    notification_kind.set(responseDetails.notification_kind);
    console.table(responseDetails);
  }
  function isFormClosed() {
    if ($submitted == true) {
      show_notice.set(true);
      notification_kind.set("success");
      form_is_closed.set(true);
      application_message.set(`Thanks for your application to the ${selected.club_name} club!`);
    } else if (
      $form_edit_state == "closed" ||
      $form_edit_state == "view" ||
      $submitted == true ||
      $form_edit_state == "" ||
      $form_edit_state == null ||
      $form_edit_state == undefined
    ) {
      notification_kind.set("error");
      form_is_closed.set(true);
      show_notice.set(true);
      application_message.set("The form is currently closed.");
    } else if ($form_edit_state == "submit") {
      notification_kind.set("success");
      show_notice.set(true);
      if ($is_in_club == true) {
        form_is_closed.set(true);
        application_message.set(
          `You are currently enrolled in the ${$current_club_name} club. Changes are not allowed at this time.`
        );
      } else {
        form_is_closed.set(false);
        application_message.set(`Please choose a club from the list below.`);
      }
    } else if ($form_edit_state == "edit") {
      form_is_closed.set(false);
      notification_kind.set("success");
      show_notice.set(true);
      notification_kind.set("info");
      if ($is_in_club == true) {
        application_message.set(
          `You are currently enrolled in the ${$current_club_name} club. You may choose a new club from the list below as long as it is not full.`
        );
      } else {
        application_message.set(`Please choose a club from the list below.`);
      }
    } else if ($form_edit_state == "approval") {
      notification_kind.set("warning");
      show_notice.set(true);
      if ($is_in_club == true) {
        form_is_closed.set(false);
        application_message.set(
          `You are currently enrolled in the ${$current_club_name} club. If you choose a new club, it needs to be approved by the administrator before you can join.`
        );
      } else {
        form_is_closed.set(false);
        application_message.set(
          `Please choose a club from the list below. It needs to be approved by the administrator before you can join.`
        );
      }
    } else {
      show_notice.set(true);
      form_is_closed.set(false);
      application_message.set(`Please contact your club administrator.`);
      notification_kind.set("error");
    }
  }
</script>

{#if $show_notice}
  <div
    class:alert-info={$notification_kind == "info"}
    class:alert-success={$notification_kind == "success"}
    class:alert-warning={$notification_kind == "warning"}
    class:alert-error={$notification_kind == "error"}
    class="alert shadow-lg my-2"
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-current flex-shrink-0 w-6 h-6"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <span>{$application_message}</span>
    </div>
  </div>
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
        class="select select-primary w-full max-w-xs"
      >
        <option value="">Select a Club Here</option>
        {#each $club_list as club}
          <option value={club}>
            {club.club_name}
          </option>
        {/each}
      </select>
    </div>

    <button
      type="submit"
      class:btn-info={$notification_kind == "info"}
      class:btn-success={$notification_kind == "success"}
      class:btn-warning={$notification_kind == "warning"}
      class:btn-error={$notification_kind == "error"}
      class="btn btn-sm mt-3"
      disabled={$form_is_closed}>submit</button
    >
  </form>
</div>
