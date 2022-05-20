<script>
  export let buttonText = "Click Me";
</script>

<button
  type="submit"
  class="bg-blue-500 inline-flex items-center my-4 py-2 px-4 font-bold text-white transition-colors duration-150 
      hover:bg-blue-700 rounded-lg focus:shadow-outline disabled:opacity-50 disabled:bg-blue-300"
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
  <span>{buttonText}</span>
</button>
