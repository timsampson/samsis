<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let userEmail = "Loading...";
  console.log(userEmail);

  function setProfileEmail(email) {
    console.log("this is the new email: " + email);
    userEmail = email;
  }
  onMount(() => {
    google.script.run.withSuccessHandler(setProfileEmail).getUserEmail();
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
</script>

<nav
  class="flex items-center justify-between flex-wrap rounded-sm bg-gradient-to-r from-blue-400 to-blue-500 px-12 py-3"
>
  <div>
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
  </div>
  <div>
    {#key userEmail}
      <div
        in:fade={{ duration: 1000 }}
        class="rounded-full py-1 px-6 bg-blue-700 text-sm text-gray-300 border border-gray-300"
      >
        {userEmail.slice(0, userEmail.indexOf("@"))}
      </div>
    {/key}
  </div>
</nav>
