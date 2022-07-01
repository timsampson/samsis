<script>
  import { term } from "../../stores/meritStore.js";
  let val = "";
  $: term.set(val.toString().toLowerCase().trim());
  $: console.log($term);
</script>

<div>
  <label for="formSearch" class="label">
    <span class="label-text">Search by students or class here.</span></label
  >
  <input
    id="formSearch"
    type="search"
    placeholder="Type here"
    class="input input-bordered input-primary w-full max-w-xs"
    bind:value={val}
  />
</div>
