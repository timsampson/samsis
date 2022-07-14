<script>
  import { subjects } from "../../stores/meritStore.js";
  import {
    meritIncidentDateValue,
    meritModalStudentId,
    meritModalSubject,
    meritModalTeacherName,
    meritModalTeacherId,
    meritModalDate,
    meritModalStudentCategory,
    meritModalStudentName,
    meritModalStudentDetails,
    meritModalSelectedCategory,
    meritModalBehaviors,
    meritModalTeachers,
  } from "../../stores/meritAdminStore.js";
  function submitUpdate() {
    console.log(`Updating meritDate ${$meritModalDate}`);
    meritEditResponse.incidentDate = $meritModalDate;
    console.log(`Updating meritStudentId ${$meritModalStudentId}`);
    meritEditResponse.behaviorCategory = $meritModalStudentId;
    console.log(`Updating meritSubject ${$meritModalSubject}`);
    meritEditResponse.behaviorSubject = $meritModalDate;
    console.log(`Updating meritStudentCategory ${$meritModalStudentCategory}`);
    // meritEditResponse.behaviorCategory = $selectedCategory;
    // console.log(`Updating meritStudentName ${$meritModalStudentName}`);
    // meritEditResponse.behaviorCategory = $selectedCategory;
    // console.log(`Updating meritStudentDetails ${$meritModalStudentDetails}`);
    // meritEditResponse.behaviorCategory = $selectedCategory;
    google.script.run
      .withSuccessHandler(meritEditSubmissionResponse)
      .meritEditSubmission(meritEditResponse);
  }
  const meritEditResponse = {
    incidentDate: "",
    selectedStudentId: "",
    selectedTeacherName: "",
    selectedTeacherId: "",
    behaviorCategory: "",
    behaviorSubject: "",
    meritBehaviors: [],
    meritDetails: "",
  };

  function meritEditSubmissionResponse(response) {
    console.log(`meritEditSubmissionResponse:`);
    console.table(response);
  }
</script>

<input type="checkbox" id="merit-edit-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Update Record Id {$meritModalStudentId}</h3>
    <p class="py-4">
      {`${$meritIncidentDateValue}, ${$meritModalStudentCategory}, ${$meritModalStudentName},
        ${$meritModalStudentDetails}`}
    </p>
    <div class="form-control w-full max-w-md">
      <label for="subject-edit" class="label">
        <span class="label-text mt-2">Change the subject:</span>
      </label>
      <select
        bind:value={$meritModalSubject}
        id="subject-edit"
        class="select select-bordered select-primary"
        required
      >
        <option disabled selected>{$meritModalSubject}</option>
        {#each subjects as subject}
          <option value={subject}>{subject}</option>
        {/each}
      </select>

      <!-- meritModalTeacherName -->
      <label for="teacher-edit" class="label">
        <span class="label-text mt-2">Change the teacher:</span>
      </label>
      <select
        bind:value={$meritModalTeacherId}
        id="teacher-edit"
        class="select select-bordered select-primary mt-2"
        required
      >
        <option disabled selected>{$meritModalTeacherName}</option>
        {#each $meritModalTeachers as teacher}
          <option value={teacher.id}>{teacher.full_name}</option>
        {/each}
      </select>
      <label for="details-edit" class="label">
        <span class="label-text mt-2">Change Details</span>
      </label>
      <textarea
        id="details-edit"
        rows="4"
        class="textarea textarea-primary mt-2"
        placeholder={$meritModalStudentDetails}
      />
    </div>
    <div class="btn-group">
      <div class="modal-action">
        <label for="merit-edit-modal" class="btn btn-primary btn-sm" on:click={() => submitUpdate()}
          >Update</label
        >
        <label for="merit-edit-modal" class="btn btn-accent btn-sm">Close</label>
      </div>
    </div>
  </div>
</div>
