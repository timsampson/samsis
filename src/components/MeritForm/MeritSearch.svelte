<script>
  import { term } from "../../stores/meritStore.js";
  let val = "";
  $: term.set(val.toString().toLowerCase().trim());
  $: console.log($term);
</script>

<input
  type="search"
  placeholder="Type here"
  class="input input-bordered input-primary w-full max-w-xs"
  bind:value={val}
/>
