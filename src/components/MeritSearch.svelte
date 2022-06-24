<script>
  import { term } from "../stores/meritStore.js";
  let val = "";
  $: term.set(val.toLowerCase().trim());
</script>

<input type="search" placeholder="Type here" class="input w-full max-w-xs" bind:value={val} />
