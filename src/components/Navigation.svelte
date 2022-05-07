<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let userEmail = "Loading...";
  let userPhoto = undefined;

  function setProfileEmail(email) {
    console.log("this is the new email: " + email);
    userEmail = email;
  }
  function setProfilePhoto(photo) {
    console.log("this is the new photo: " + photo);
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-10 w-10 pr-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
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
  <div
    class="absolute inset-y-0 right-3 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
  >
    {#if userEmail && userPhoto !== undefined}
      <div
        in:fade={{ duration: 1000 }}
        class="rounded-full py-1 px-6 bg-blue-700 text-sm text-gray-300 border border-gray-300"
      >
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
      <svg
        class="h-10 ml-2 w-10 rounded-full mr-1"
        xmlns="http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 0 24 24"
        width="32px"
        fill="#FFFFFF"
        ><path d="M0 0h24v24H0V0z" fill="none" /><path
          d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"
        /></svg
      >
    {/if}
  </div>
</nav>
