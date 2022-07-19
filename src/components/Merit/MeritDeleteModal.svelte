<script>
  import {
    meritModalRecordId,
    meritModalStudentId,
    meritModalSubject,
    meritModalTeacherName,
    meritModalDate,
    meritModalStudentName,
  } from "../../stores/meritAdminStore.js";
  function deleteRecord(meritRecordId) {
    google.script.run.withSuccessHandler(deleteRecordResponse).deleteMeritEntry(meritRecordId);

    console.log(`Deleting id ${meritRecordId}`);
  }

  function deleteRecordResponse(response) {
    console.log(`Delete response: ${response}`);
  }
</script>

<input type="checkbox" id="merit-delete-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Delete Record ID {$meritModalRecordId}</h3>
    <p class="py-4">
      Record ID {$meritModalRecordId} for {$meritModalStudentName} with student ID {$meritModalStudentId}
      on {$meritModalDate} from {$meritModalTeacherName} in class {$meritModalSubject}
    </p>
    <div class="modal-action grid grid-cols-2 justify-items-stretch">
      <label for="merit-delete-modal" class="justify-self-start btn btn-secondary"
        >Close Window</label
      >
      <label
        for="merit-delete-modal"
        on:click={() => deleteRecord($meritModalRecordId)}
        class="justify-self-end btn btn-primary text-white">Delete Record</label
      >
    </div>
  </div>
</div>
