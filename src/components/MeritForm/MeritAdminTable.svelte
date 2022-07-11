<script>
  import { fade } from "svelte/transition";
  import {
    meritAdminValues,
    meritModalDate,
    meritModalStudentId,
    meritModalStudentCategory,
    meritModalStudentName,
    meritModalStudentDetails,
  } from "../../stores/meritAdminStore.js";
  function deleteRecord(merit) {
    console.log(`Deleting ${merit.all_details} with id ${merit.id}`);
  }
  function editRecord(merit) {
    meritModalDate.set(merit.incident_date);
    meritModalStudentId.set(merit.student_id);
    meritModalStudentCategory.set(merit.categories);
    meritModalStudentName.set(merit.student_name);
    meritModalStudentDetails.set(merit.all_details);
    console.log(`Editing ${merit.all_details} with id ${merit.id}`);
  }
  function submitUpdate(meritID) {
    console.log(`Updating meritID ${meritID}`);
  }
</script>

<div class="overflow-x-auto">
  <table class="table table-compact w-full table-zebra" in:fade|local={{ duration: 1000 }}>
    <thead>
      <tr>
        <th class="text-center">Delete</th>
        <th class="text-center">Edit</th>
        <th>Date</th>
        <th>Student</th>
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
                class="btn btn-error btn-xs btn-square ml-2"
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
                for="my-modal"
                class="btn btn-info btn-xs ml-2 text-white"
                on:click={() => editRecord(merit)}
              >
                edit
              </label>

              <button
                on:click={() => editRecord(merit)}
                type="button"
                class="btn btn-info btn-xs btn-square ml-2"
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
            <td>{merit.timestamp.toLocaleDateString()}</td>
            <td>{merit.student_name}</td>
            <td>{merit.teacher_name}</td>
            <td>{merit.categories}</td>
            <td>{merit.type}</td>
            <td>{merit.all_details}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th>Date</th>
          <th>Student</th>
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
        <td>Teacher Name</td>
        <td>Merit Category</td>
        <td>Merit Type</td>
        <td>Lots of details here.</td>
      </tr>
    {/if}
  </table>

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Update Record Id {$meritModalStudentId}</h3>
      <p class="py-4">
        {`${$meritModalDate}, ${$meritModalStudentCategory}, ${$meritModalStudentName},
        ${$meritModalStudentDetails}`}
      </p>
      <div class="modal-action">
        <label for="my-modal" class="btn" on:click={() => submitUpdate($meritModalStudentId)}
          >Update</label
        >
      </div>
    </div>
  </div>
</div>
