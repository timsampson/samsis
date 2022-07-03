<script>
  import { subjects } from "../../stores/meritStore.js";
</script>

<div class="form-control w-full max-w-xs">
  <label for="subject-select" class="label">
    <span class="label-text">Select the subject:</span>
  </label>
  <select id="subject-select" class="select select-bordered select-primary" required>
    <option value="">-- Please choose --</option>
    {#each subjects as subject}
      <option value={subject}>{subject}</option>
    {/each}
  </select>
</div>
