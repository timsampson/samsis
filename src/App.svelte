<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import { onMount } from "svelte";
  onMount(async () => {
    google.script.url.getLocation(function (location) {
      if (location.hash.length > 0) {
        google.script.history.push({}, "", location.hash);
      } else {
        google.script.history.push({}, "", "/");
      }
    });
  });
  google.script.history.setChangeHandler(function (e) {
    let locationHash = e.location.hash;
    if (locationHash.length > 0) {
      google.script.history.push({}, "", locationHash);
    } else {
      google.script.history.push({}, "", "/");
    }
  });
  function setURL(locationHash) {
    if (locationHash.length > 0) {
      google.script.history.push({}, "", locationHash);
    } else {
      google.script.history.push({}, "", "/");
    }
  }
  const routes = {
    "/": Home,
    "/home/": Home,
    "/about/": About,
    "*": NotFound,
  };
</script>

<main>
  <nav class="pl-2 py-2 bg-slate-400">
    <a
      href="#/"
      on:click={() => setURL("/home")}
      class="hover:text-gray-300 mx-2 text-sm text-blue-800">Home</a
    >
    <a
      href="#/about/"
      on:click={() => setURL("/about")}
      class="hover:text-gray-300 mx-2 text-sm text-blue-800">About</a
    >
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
