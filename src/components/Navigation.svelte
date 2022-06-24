<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

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

<nav class="bg-white container flex flex-wrap justify-between items-center mx-auto">
  <div class="justify-self-start base-100">
    <a href="#/" on:click={() => setURL("/home")} class="btn btn-ghost normal-case text-xl"
      >SAMSIS</a
    >
  </div>
  <div class="justify-self-end hidden lg:flex">
    <ul class="menu menu-horizontal p-0">
      <li>
        <a href="#/about/" on:click={() => setURL("/about")}>About</a>
      </li>
      <li>
        <a href="#/clubsignup/" on:click={() => setURL("/clubsignup")}>Club Sign Up</a>
      </li>
      <li>
        <a href="#/clubadmin/" on:click={() => setURL("/clubadmin")}>Club Admin</a>
      </li>
      <li>
        <a href="#/merit/" on:click={() => setURL("/merit")}>Merit</a>
      </li>
      <li>
        <a href="#/meritadmin/" on:click={() => setURL("/meritadmin")}>Merit Admin</a>
      </li>
    </ul>
  </div>
  <div class="justify-self-end">
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
  </div>
</nav>
