<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";

  const routes = {
    "/": Home,
    "/about/": About,
  };
</script>

<main>
  <nav class="pl-2 py-2 bg-slate-400">
    <a href="#/" class="hover:text-gray-300 mx-2 text-sm text-blue-800">Home</a>
    <a href="#/about/" class="hover:text-gray-300 mx-2 text-sm text-blue-800">About</a>
  </nav>
  <body class="p-4 bg-slate-50">
    <Router {routes} />
  </body>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
