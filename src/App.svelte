<script>
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import ClubSignUp from "./routes/ClubSignUp.svelte";
  import Navigation from "./components/Shared/Navigation.svelte";
  import ClubAdmin from "./routes/ClubAdmin.svelte";
  import Merit from "./routes/Merit.svelte";
  import MeritAdmin from "./routes/MeritAdmin.svelte";
  import MeritForm from "./routes/MeritForm.svelte";
  google.script.url.getLocation(function (location) {
    if (location.hash.length > 0) {
      push(location.hash);
    } else {
      push("/");
    }
  });
  const routes = {
    "/": Home,
    "/home/": Home,
    "/about/": About,
    "/clubsignup/": ClubSignUp,
    "/clubadmin/": ClubAdmin,
    "/merit": Merit,
    "/meritform/": MeritForm,
    "/meritadmin/": MeritAdmin,
    "*": NotFound,
  };
</script>

<body>
  <Navigation />
  <main class="m-2">
    <Router {routes} />
  </main>
</body>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
