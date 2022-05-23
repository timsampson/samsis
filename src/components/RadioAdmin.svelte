<script>
  let approvalType = "";
  let approvedSelected = false;
  let rejectedSelected = false;
</script>

<fieldset>
  <div class="flex mt-2 ml-4">
    <div class="form-check form-check-inline mr-4">
      <input
        class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-600 bg-grey-200 checked:bg-green-600 checked:border-green-800 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer"
        type="radio"
        name="approvalType"
        id="approved"
        value="approved"
        bind:group={approvalType}
      />
      <label
        class="form-check-label inline-block cursor-pointer"
        class:text-green-800={approvalType == "approved"}
        for="approved">Approved</label
      >
    </div>
    <div class="form-check form-check-inline mr-4">
      <input
        class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-600 bg-grey-200 checked:bg-red-600 checked:border-red-800 focus:outline-none transition duration-200 mt-1 align-top cursor-pointer"
        type="radio"
        name="approvalType"
        id="rejected"
        value="rejected"
        bind:group={approvalType}
      />
      <label
        class="form-check-label inline-block cursor-pointer"
        class:text-red-500={approvalType == "rejected"}
        for="rejected">Rejected</label
      >
    </div>
  </div>
</fieldset>
