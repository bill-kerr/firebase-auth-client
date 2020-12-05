<script lang="ts">
  import { onDestroy } from 'svelte';
  import Panel from './Panel.svelte';
  import PanelTitle from './PanelTitle.svelte';
  import LogInOutForm from './LogInOutForm.svelte';
  import IconLogin from '../icons/IconLogin.svelte';
  import IconChevronDoubleRight from '../icons/IconChevronDoubleRight.svelte';
  import WarningBadge from './WarningBadge.svelte';
  import type { User } from '../user';
  import { noUser, setAuthStateListener, isNoUser, logout } from '../auth';
  import type { AuthUnsubscribe } from '../auth';
  import IconTrash from '../icons/IconTrash.svelte';
  import IconCursorClick from '../icons/IconCursorClick.svelte';
  import UserInfo from './UserInfo.svelte';

  export let enabled = false;
  let user: User = noUser;
  let loginFormValues = {
    email: '',
    password: '',
  };
  let authUnsubscribe: AuthUnsubscribe = () => null;
  $: authUnsubscribe = enabled ? setAuthStateListener(onAuthStateChanged, false) : () => null;

  function onAuthStateChanged(newUser: User) {
    if (newUser.id === user.id && user.loggedIn) {
      newUser.loggedIn = true;
    }
    user = newUser;
  }

  function loginAsUser() {
    user.loggedIn = true;
  }

  function handleLogin(newUser: User) {
    if (newUser.id === user.id) {
      user.loggedIn = true;
    }
  }

  onDestroy(authUnsubscribe);
</script>

<Panel>
  <div slot="header" class="flex items-center justify-between select-none">
    <PanelTitle title="Login/Logout">
      <div slot="icon">
        <IconLogin className="w-6 h-6 text-yellow-900" />
      </div>
    </PanelTitle>
    {#if user.loggedIn}
      <div class="text-sm px-2 py-1 rounded font-bold text-green-800 bg-green-100">
        Logged in as
        {user.email}
      </div>
    {:else}
      <div class="text-sm px-2 py-1 rounded font-bold text-red-800 bg-red-100">Logged out</div>
    {/if}
  </div>
  <div slot="content" class="flex space-x-4">
    {#if !user.loggedIn}
      <div class="w-1/2 flex-shrink-0">
        <LogInOutForm
          bind:email={loginFormValues.email}
          bind:password={loginFormValues.password}
          on:login={event => handleLogin(event.detail)}
          {enabled} />
      </div>
      <div class="p-4 w-full flex flex-col items-center justify-center bg-gray-100 rounded">
        {#if !enabled}
          <WarningBadge message="Firebase must be configured to login" />
        {:else if !isNoUser(user) && !user.loggedIn}
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
        {:else}
          <div class="flex items-center">
            <IconCursorClick className="h-6 w-6 text-gray-700" />
            <span class="ml-2">Login using the form to the left</span>
          </div>
        {/if}
      </div>
    {:else}
      <UserInfo {user} on:logout={() => (user.loggedIn = false)} on:clearSession={logout} />
    {/if}
  </div>
</Panel>
