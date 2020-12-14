<script lang="ts">
  import { onDestroy, createEventDispatcher } from "svelte";
  import Panel from "./Panel.svelte";
  import LogInOutForm from "./LogInOutForm.svelte";
  import IconChevronDoubleRight from "../icons/IconChevronDoubleRight.svelte";
  import WarningBadge from "./WarningBadge.svelte";
  import type { User } from "../types";
  import { noUser, setAuthStateListener, isNoUser, logout } from "../auth";
  import type { AuthUnsubscribe } from "../auth";
  import IconTrash from "../icons/IconTrash.svelte";
  import IconCursorClick from "../icons/IconCursorClick.svelte";
  import UserInfo from "./UserInfo.svelte";
  import { preferences } from "../stores";

  export let active = false;
  export let enabled = false;
  export let autoLogin = false;

  let user: User = noUser;
  let loginError = false;
  let loginFormValues = {
    email: "",
    password: "",
  };
  let authUnsubscribe: AuthUnsubscribe = () => null;
  $: authUnsubscribe = enabled
    ? setAuthStateListener(onAuthStateChanged, autoLogin)
    : () => null;

  const dispatchLoggedIn = createEventDispatcher<{ loggedIn: boolean }>();

  function onAuthStateChanged(newUser: User) {
    if (newUser.id === user.id && user.loggedIn) {
      newUser.loggedIn = true;
    }
    user = newUser;
    dispatchLoggedIn("loggedIn", user.loggedIn);
  }

  function loginAsUser() {
    user.loggedIn = true;
    dispatchLoggedIn("loggedIn", user.loggedIn);
  }

  function handleLogin(newUser: User) {
    if (newUser.id === user.id) {
      user.loggedIn = true;
      dispatchLoggedIn("loggedIn", user.loggedIn);
    }
  }

  function handleClickLogout(clearSession: boolean) {
    if (clearSession) {
      logout();
    }
    user.loggedIn = false;
    dispatchLoggedIn("loggedIn", false);
  }

  function handleLoginError(isError: boolean) {
    loginError = isError;
  }

  onDestroy(authUnsubscribe);
</script>

<Panel show={active}>
  <div slot="content" class="flex space-x-4 justify-center">
    {#if !enabled}
      <!-- NOT ENABLED -->
      <WarningBadge message="Firebase must be configured to login" />
    {:else if enabled && user.loggedIn}
      <!-- ENABLED AND USER LOGGED IN -->
      <UserInfo
        {user}
        on:logout={() => handleClickLogout(false)}
        on:clearSession={() => handleClickLogout(true)} />
    {:else}
      <!-- ENABLED AND USER NOT LOGGED IN -->
      <div class="w-1/2 flex-shrink-0">
        <LogInOutForm
          bind:email={loginFormValues.email}
          bind:password={loginFormValues.password}
          on:login={(event) => handleLogin(event.detail)}
          on:error={(event) => handleLoginError(event.detail)}
          {enabled} />
      </div>
      <div
        class="p-4 w-full flex flex-col items-center justify-center bg-gray-100 rounded">
        {#if loginError}
          <!-- IF LOGIN ERROR -->
          <WarningBadge message="Email or password was incorrect" />
        {:else if isNoUser(user)}
          <!-- NO USER DETECTED -->
          <div class="flex items-center">
            <IconCursorClick className="h-6 w-6 text-gray-700" />
            <span class="ml-2">Login using the form to the left</span>
          </div>
        {:else}
          <!-- USER DETECTED -->
          <div>
            <button
              on:click={loginAsUser}
              class="w-full py-3 px-4 flex items-center bg-gray-900 text-white font-bold text-sm rounded hover:bg-gray-800 focus:ring focus:outline-none">
              <IconChevronDoubleRight className="h-4 w-4" />
              <span class="ml-2">Log back in as</span>
              <span class="ml-1 text-yellow-200">{user.email}</span>
            </button>
            <button
              on:click={logout}
              class="mt-4 w-full py-3 px-4 flex items-center bg-white border border-gray-300 text-sm font-bold rounded focus:ring focus:outline-none hover:border-gray-400">
              <IconTrash className="-ml-1 h-5 w-5 text-gray-700" />
              <span class="ml-2">Clear local session</span>
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Panel>
