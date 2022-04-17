<script>
  google.script.run.withSuccessHandler(logURL).getAppScriptURL();
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  onMount(async () => {
    google.script.url.getLocation(function (location) {
      push(location.hash);
      if (location.hash.length > 0) {
        push(location.hash);
        google.script.history.push({}, "", location.hash);
      } else {
        google.script.history.push({}, "", "/");
      }
    });
  });
  function logURL(url) {
    console.log("current Appscript URL is: " + url);
  }
  google.script.history.setChangeHandler(function (e) {
    console.log("setChangeHandler state: " + e.state);
    console.log("setChangeHandler parameters: " + e.location.parameters);
    console.log("setChangeHandler hash: " + e.location.hash);
    // google.script.history.push({}, "", e.location.hash);
    let locationHash = e.location.hash;
    // Adjust web app UI to match popped state here...
    if (locationHash.length > 0) {
      google.script.history.push({}, "", locationHash);
    } else {
      google.script.history.push({}, "", "/");
    }
  });
  // when links are clicked, push the new location hash to the url bar
  // The router already impliments this feature, but it doesn't work in the
  // Google Apps Script environment.
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
