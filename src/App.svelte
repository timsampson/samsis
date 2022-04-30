<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import ClubSignUp from "./routes/ClubSignUp.svelte";
  import Navigation from "./components/Navigation.svelte";

  const routes = {
    "/": Home,
    "/home/": Home,
    "/about/": About,
    "/clubsignup/": ClubSignUp,
    "*": NotFound,
  };
</script>

<main>
  <Navigation />
  <body class="p-4 bg-slate-50">
    <Router {routes} />
  </body>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
