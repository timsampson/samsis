<script>
  import { stepOneComplete } from "../../stores/meritStore.js";
</script>

<label for="completePartOne" class="label">
  <span class="label-text">Select Next to continue.</span>
</label>
<button
  id="completePartOne"
  on:click={() => stepOneComplete.set(true)}
  type="button"
  class="ml-2 btn btn-sm btn-primary">Next</button
>
