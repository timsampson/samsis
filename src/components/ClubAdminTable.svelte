<script>
  import { fade } from "svelte/transition";
  import SubmitButton from "./SubmitButton.svelte";
  export let approvalRecords = [];
  export let titles;
  export let buttonText;
</script>

<SubmitButton {buttonText} />
<div>
  {#if approvalRecords.length > 0}
    <table
      in:fade={{ duration: 1000 }}
      class="table table-auto mx-auto text-sm border-blue-800 border-4"
    >
      <thead>
        <tr class="bg-gradient-to-r from-blue-500 to-blue-600">
          {#each titles as title, i (titles[i])}
            <th class="capitalize text-white px-2 border border-blue-800">{title}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each approvalRecords as record}
          <tr class="odd:bg-gray-200">
            <td class="mx-2 px-2 border border-blue-800">{record.name}</td>
            <td class="mx-2 px-2 border border-blue-800"
              >{record.email.slice(0, record.email.indexOf("@"))}</td
            >
            <td class="px-2 border border-blue-800 text-center"
              >{record.formSubmissionDate.toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}</td
            >
            <td class="px-2 border border-blue-800 text-center">{record.appliedClubId}</td>
            <td class="px-2 border border-blue-800 text-center">{record.appliedClubName}</td>

            <td class="mx-2  px-2 border border-blue-800">{record.isApproved}</td>
            <td class="mx-2 px-2 border border-blue-800">{record.grade}</td>
            <td class="mx-2 px-2 border border-blue-800">{record.homeroom}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
