<script>
  import { meritDateValue, dateIsSelected } from "../../stores/meritStore.js";
  let selectedDate = new Date();
  $: meritDateValue.set(selectedDate);
</script>

<div>
  <label for="meritformDate" class="label">
    <span class="label-text">Select the date of the incident</span>
  </label>
  <input
    on:change={() => dateIsSelected.set(true)}
    type="date"
    id="meritformDate"
    name="meritDate"
    bind:value={selectedDate}
    min="2021-01-01"
    max="2022-12-31"
    class="input input-bordered input-primary w-full max-w-xs"
  />
</div>
