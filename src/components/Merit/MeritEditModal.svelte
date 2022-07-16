<script>
  google.script.run.withSuccessHandler(loadStudentsHRData).getAllStudentsHRInfo();
  import MeritSearch from "./MeritSearch.svelte";
  import { subjects } from "../../stores/meritStore.js";
  import { filtered, studentsData } from "../../stores/meritStore.js";
  import {
    meritIncidentDateValue,
    meritModalSelectedStudent,
    meritModalStudentId,
    meritModalSubject,
    meritModalTeacherName,
    meritModalTeacherId,
    MeritModalSelectedTeacher,
    meritModalDate,
    meritModalStudentCategory,
    meritModalStudentName,
    meritModalStudentDetails,
    meritModalTeachers,
  } from "../../stores/meritAdminStore.js";

  function loadStudentsHRData(studentsHRData) {
    studentsHRData.forEach((record, index) => {
      studentsHRData[index] = JSON.parse(record);
    });
    studentsData.set(studentsHRData);
  }
  function updateStudent(student) {
    meritModalStudentId.set(student.id);
    meritModalStudentName.set(student.student_name);
  }
  function updateTeacher(teacher) {
    meritModalTeacherId.set(teacher.id);
    meritModalTeacherName.set(student.full_name);
  }

  const meritEditResponse = {
    selectedStudentId: "",
    selectedStudentName: "",
    selectedSubject: "",
    selectedIncidentDate: "",
    selectedTeacherName: "",
    selectedTeacherId: "",
    incidentDatebehaviorCategory: "",
    behaviorSubject: "",
    meritBehaviors: [],
    meritDetails: "",
  };

  function submitUpdate() {
    meritEditResponse.selectedStudentId = $meritModalStudentId;
    console.log(`Updating selectedStudentId ${meritEditResponse.selectedStudentId}`);

    meritEditResponse.selectedStudentName = $meritModalStudentName;
    console.log(`Updating selectedStudentName ${meritEditResponse.selectedStudentName}`);

    meritEditResponse.selectedSubject = $meritModalSubject;
    console.log(`Updating selectedSubject ${meritEditResponse.selectedSubject}`);

    meritEditResponse.selectedTeacherId = $meritModalTeacherId;
    console.log(`Updating selectedTeacherId ${meritEditResponse.selectedTeacherId}`);
    // meritEditResponse.incidentDate = $meritModalDate;
    // console.log(`Updating meritDate ${meritEditResponse.incidentDate}`);

    // meritEditResponse.selectedTeacherName = $MeritModalSelectedTeacher.full_name;
    // console.log(`Updating selectedTeacherName ${meritEditResponse.selectedTeacherName}`);

    // meritEditResponse.selectedTeacherId = $MeritModalSelectedTeacher.id;
    // console.log(`Updating selectedTeacherId ${meritEditResponse.selectedTeacherId}`);

    google.script.run
      .withSuccessHandler(meritEditSubmissionResponse)
      .meritEditSubmission(meritEditResponse);
  }

  function meritEditSubmissionResponse(response) {
    console.log(`meritEditSubmissionResponse:`);
    console.table(response);
  }
</script>

<input type="checkbox" id="merit-edit-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box w-11/12 max-w-5xl">
    <h3 class="font-bold text-lg">Update Record Id {$meritModalStudentId}</h3>
    <!-- first row -->
    <div class="grid grid-cols-3 gap-4">
      <!-- Student Search -->
      <div>
        <MeritSearch />
      </div>
      <!-- Student Select -->
      <div>
        <label for="student-edit" class="label">
          <span class="label-text">Change the student:</span>
        </label>
        <select
          bind:value={$meritModalStudentName}
          id="student-edit"
          class="select select-bordered select-primary"
          required
        >
          <option disabled selected>{$meritModalStudentName}</option>
          {#each $filtered as student}
            <option on:blur={() => updateStudent(student)} value={student.student_name}
              >{student.student_name}
            </option>
          {/each}
        </select>
      </div>
      <!-- Subject Select -->
      <div>
        <label for="subject-edit" class="label">
          <span class="label-text">Change the subject:</span>
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
      </div>
    </div>
    <!-- second row -->
    <div class="grid grid-cols-3 gap-4">
      <!-- meritModalTeacherName -->
      <div>
        <label for="teacher-edit" class="label">
          <span class="label-text">Change the teacher:</span>
        </label>
        <select
          bind:value={$meritModalTeacherName}
          id="teacher-edit"
          class="select select-bordered select-primary"
          required
        >
          <option disabled selected>{$meritModalTeacherName}</option>
          {#each $meritModalTeachers as teacher}
            <option on:blur={() => updateTeacher(teacher)} value={teacher}
              >{teacher.full_name}</option
            >
          {/each}
        </select>
      </div>
      <!-- meritModalDate  -->
      <div>
        <label for="meritModalDate" class="label">
          <span class="label-text">Change the incident date</span>
        </label>
        <input
          type="date"
          id="meritModalDate"
          name="meritModalDate"
          bind:value={$meritModalDate}
          class="input input-bordered input-primary w-full max-w-xs rounded-lg"
        />
      </div>
    </div>

    <!-- Modal details  -->
    <div>
      <label for="details-edit" class="label">
        <span class="label-text mt-2">Change Details</span>
      </label>
      <textarea
        id="details-edit"
        rows="4"
        class=" block w-full p-2.5 textarea textarea-primary textarea-bordered"
        placeholder={$meritModalStudentDetails}
      />
    </div>
    <!-- ? -->
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
