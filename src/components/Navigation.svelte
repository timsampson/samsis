<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { Building } from "carbon-icons-svelte";
  import { UserAvatar } from "carbon-icons-svelte";

  let userEmail = "Loading...";
  let userPhoto = undefined;

  function setProfileEmail(email) {
    userEmail = email;
  }
  function setProfilePhoto(photo) {
    userPhoto = photo;
  }
  onMount(() => {
    google.script.run.withSuccessHandler(setProfileEmail).getUserEmail();
    google.script.run.withSuccessHandler(setProfilePhoto).getUserPhoto();
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
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <Building fill="white" size={24} />
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
    <a
      href="#/merit/"
      on:click={() => setURL("/merit")}
      class="hover:text-gray-300 mx-2 text-sm text-blue-800">Merit</a
    >
    <a
      href="#/clubadmin/"
      on:click={() => setURL("/clubadmin")}
      class="hover:text-gray-300 mx-2 text-sm text-blue-800">Club Admin</a
    >
  </div>
  <div
    class="absolute inset-y-0 right-3 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
  >
    {#if userEmail && userPhoto !== undefined}
      <div class="rounded-full py-1 px-6 bg-blue-700 text-sm text-gray-300 border border-gray-300">
        {userEmail.slice(0, userEmail.indexOf("@"))}
      </div>
      <img
        in:fade={{ duration: 1000 }}
        class="h-10 ml-2 w-10 rounded-full mr-1"
        height="32px"
        width="32px"
        src="data:image/jpeg;base64,{userPhoto}"
        alt="avatar"
      />
    {:else}
      <div
        in:fade={{ duration: 1000 }}
        class="rounded-full py-1 px-6 bg-blue-700 text-sm text-gray-300 border border-gray-300"
      >
        Loading...
      </div>
      <UserAvatar fill="blue" size={32} />
    {/if}
  </div>
</nav>
