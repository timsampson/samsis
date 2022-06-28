<script>
  import { term } from "../stores/meritStore.js";
  let val = "";
  $: term.set(val.toString().toLowerCase().trim());
  $: console.log($term);
</script>

<input
  type="search"
  placeholder="Type ID or Name"
  class="m-2 input-bordered input-accent input-md input w-full max-w-xs"
  bind:value={val}
/>
