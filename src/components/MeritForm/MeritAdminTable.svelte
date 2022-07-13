<script>
  import { fade } from "svelte/transition";
  import {
    meritAdminValues,
    meritModalDate,
    meritIncidentDateValue,
    meritModalStudentId,
    meritModalSubject,
    meritModalStudentCategory,
    meritModalStudentName,
    meritModalStudentDetails,
  } from "../../stores/meritAdminStore.js";
  import { subjects } from "../../stores/meritStore.js";

  function deleteRecord(merit) {
    console.log(`Deleting ${merit.details} with id ${merit.id}`);
  }
  function editRecord(merit) {
    meritIncidentDateValue.set(merit.incident_date.toLocaleDateString());
    console.log(`Updating meritModalDate ${$meritIncidentDateValue}`);
    meritModalSubject.set(merit.subject);
    meritModalStudentId.set(merit.student_id);
    meritModalStudentCategory.set(merit.categories);
    meritModalStudentName.set(merit.student_name);
    meritModalStudentDetails.set(merit.details);
    console.log(`Editing ${merit.details} with id ${merit.id}`);
  }
  function submitUpdate() {
    console.log(`Updating meritDate ${$meritModalDate}`);
    console.log(`Updating meritSubject ${$meritModalSubject}`);
    console.log(`Updating meritStudentId ${$meritModalStudentId}`);
    console.log(`Updating meritStudentCategory ${$meritModalStudentCategory}`);
    console.log(`Updating meritStudentName ${$meritModalStudentName}`);
    console.log(`Updating meritStudentDetails ${$meritModalStudentDetails}`);
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
          <span class="label-text mt-2">Select the subject:</span>
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
        <textarea
          rows="6"
          class="textarea textarea-primary mt-2"
          placeholder={$meritModalStudentDetails}
        />
      </div>
      <div class="modal-action">
        <label for="merit-edit-modal" class="btn btn-primary btn-sm" on:click={() => submitUpdate()}
          >Update</label
        >
      </div>
      <div class="modal-action">
        <label for="merit-edit-modal" class="btn btn-accent btn-sm">Close</label>
      </div>
    </div>
  </div>
</div>
