<script>
  import MeritSearch from "../components/MeritSearch.svelte";
  import StudentHRTable from "../components/MeritSearchTable.svelte";
</script>

<h1>Merit Form Page</h1>
<p>
  Start by searching for the student below, either by name or by homeroom. Then select and add the
  students in Add Students section..
</p>
<div class="container mx-auto">
  <form>
    <section>
      <MeritSearch />
      <button type="button" class="ml-2 btn btn-primary">Next</button>
    </section>
    <section>
      <StudentHRTable />
    </section>
  </form>
</div>
