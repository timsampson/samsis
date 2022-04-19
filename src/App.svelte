<script>
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import ClubSignUp from "./routes/ClubSignUp.svelte";
  let userEmail = "Loading...";
  console.log(userEmail);

  function setProfileEmail(email) {
    console.log("this is the new email: " + email);
    userEmail = email;
  }
  onMount(() => {
    console.log("onMount Loaded");
    google.script.run.withSuccessHandler(setProfileEmail).getUserEmail();
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
    "/clubsignup/": ClubSignUp,
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
    <a
      href="#/clubsignup/"
      on:click={() => setURL("/clubsignup")}
      class="hover:text-gray-300 mx-2 text-sm text-blue-800">Club Sign Up</a
    >
    {#key userEmail}
      <div
        in:fade={{ duration: 1000 }}
        class="rounded-full w-36 py-1 px-6 bg-blue-700 text-sm text-gray-300 border border-gray-300"
      >
        {userEmail.slice(0, userEmail.indexOf("@"))}
      </div>
    {/key}
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
