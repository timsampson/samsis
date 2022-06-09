<script>
  let button_class =
    "inline-flex items-center my-4 py-2 px-4 font-bold text-white transition-colors duration-150 rounded-lg focus:shadow-outline disabled:opacity-50";
  export let submitted;
  export let buttonID;
</script>

<button
  type="submit"
  id={buttonID}
  class={button_class}
  class:bg-green-500={submitted}
  class:hover:bg-green-700={submitted}
  class:bg-blue-500={!submitted}
  class:hover:bg-blue-700={!submitted}
  disabled={submitted}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
  <slot />
</button>
