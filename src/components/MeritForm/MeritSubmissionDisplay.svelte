<script>
  import {
    selectedStudents,
    meritDetails,
    selectedCategory,
    meritDateValue,
  } from "../../stores/meritStore.js";
</script>

<p class="text-xl m-2">Your submission included the following details.</p>
<p class="m-2"><span class="font-semibold">Merit Category: </span>{$selectedCategory}</p>
<p class="font-semibold">Incident date: {$meritDateValue}</p>
<p class="m-2 text-lg">Students in report:</p>
<ul>
  {#each $selectedStudents as student, i}
    <li class="m-2">
      <span class="font-semibold">{i + 1}) ID: </span>{student.student_id},
      <span class="font-semibold">Name: </span>{student.student_name}
    </li>
  {/each}
</ul>
<pre class="m-2"><span class="font-semibold">Merit Details: </span>{$meritDetails}</pre>
