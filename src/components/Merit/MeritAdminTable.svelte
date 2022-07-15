<script>
  import { fade } from "svelte/transition";
  import MeritEditModal from "./MeritEditModal.svelte";
  import {
    meritAdminValues,
    meritIncidentDateValue,
    meritModalStudentId,
    meritModalSubject,
    meritModalTeacherName,
    meritModalTeacherId,
    meritModalStudentCategory,
    meritModalStudentName,
    meritModalStudentDetails,
    meritModalSelectedCategory,
    meritModalBehaviors,
    meritModalDate,
  } from "../../stores/meritAdminStore.js";

  function deleteRecord(merit) {
    console.log(`Deleting ${merit.details} with id ${merit.id}`);
  }
  function editRecord(merit) {
    meritIncidentDateValue.set(merit.incident_date.toLocaleDateString("en-CA"));
    meritModalDate.set(merit.incident_date.toLocaleDateString("en-CA"));
    meritModalSubject.set(merit.subject);
    meritModalStudentId.set(merit.student_id);
    meritModalStudentCategory.set(merit.categories);
    meritModalStudentName.set(merit.student_name);
    meritModalTeacherName.set(merit.teacher_name);
    meritModalTeacherId.set(merit.teacher_id);
    meritModalStudentDetails.set(merit.details);
    meritModalSelectedCategory.set(merit.behaviorCategory);
    meritModalBehaviors.set(merit.behavior);
    meritModalStudentId.set(merit.student_id);
    console.log(`Editing ${merit.details} with id ${merit.id}`);
  }
</script>

<div class="overflow-x-auto">
  <table class="table table-compact w-full table-zebra" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th class="text-center">Delete</th>
        <th class="text-center">Edit</th>
        <th>Submitted Date</th>
        <th>Incident Date</th>
        <th>Student</th>
        <th>Subject</th>
        <th>Teacher</th>
        <th>Category</th>
        <th>Type</th>
        <th>Details</th>
      </tr>
    </thead>
    {#if $meritAdminValues.length > 0}
      <tbody>
        {#each $meritAdminValues as merit}
          <tr>
            <td class="text-center align-middle">
              <button
                on:click={() => deleteRecord(merit)}
                type="button"
                class="btn btn-error btn-xs btn-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </td>
            <td class="text-center align-middle">
              <!-- The button to open modal -->
              <label
                for="merit-edit-modal"
                class="btn btn-info btn-xs btn-square text-white"
                on:click={() => editRecord(merit)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </label>
            </td>
            <td>{merit.timestamp.toLocaleDateString()}</td>
            <td>{merit.incident_date.toLocaleDateString()}</td>
            <td>{merit.student_name}</td>
            <td>{merit.subject}</td>
            <td>{merit.teacher_name}</td>
            <td>{merit.categories}</td>
            <td>{merit.type}</td>
            <td>{merit.details}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th class="text-center">Delete</th>
          <th class="text-center">Edit</th>
          <th>Submitted Date</th>
          <th>Incident Date</th>
          <th>Student</th>
          <th>Subject</th>
          <th>Teacher</th>
          <th>Category</th>
          <th>Type</th>
          <th>Details</th>
        </tr>
      </tfoot>
    {:else}
      <tr>
        <td class="text-center align-middle">
          <button type="button" class="btn btn-error btn-xs btn-square ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </td>
        <td class="text-center align-middle">
          <button type="button" class="btn btn-info btn-xs btn-square ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </td>
        <td>9/2/2021</td>
        <td>9/5/2021</td>
        <td>Student Name</td>
        <td>Subject Name</td>
        <td>Teacher Name</td>
        <td>Merit Category</td>
        <td>Merit Type</td>

        <td>Lots of details here.</td>
      </tr>
    {/if}
  </table>

  <!-- Modal for merit-edit-modal -->
  <MeritEditModal />
</div>
