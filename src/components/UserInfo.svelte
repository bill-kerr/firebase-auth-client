<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import beautify from 'json-beautify';
  import { getCurrentUser, noUser } from '../auth';
  import type { User } from '../user';
  import IconTrash from '../icons/IconTrash.svelte';
  import IconLogout from '../icons/IconLogout.svelte';
  import IconDuplicate from '../icons/IconDuplicate.svelte';
  export let user: User = noUser;
  let firebaseUser: ReturnType<typeof getCurrentUser>;
  let jsonUser: string = '';

  const dispatchLogout = createEventDispatcher<{ logout: boolean }>();
  const dispatchClearSession = createEventDispatcher<{ clearSession: boolean }>();

  function handleClickCopy() {
    navigator.clipboard.writeText(jsonUser);
  }

  onMount(() => {
    firebaseUser = getCurrentUser();
    jsonUser = beautify(firebaseUser, null, 2);
  });
</script>

<div class="w-full space-y-4">
  <div class="w-full flex justify-between">
    <p class="p-4 flex-1 bg-yellow-100 rounded">
      You are logged in as<span class="ml-1 font-bold">{user.email}</span>
    </p>
    <div class="ml-4 flex items-center">
      <button
        on:click={() => dispatchClearSession('clearSession', true)}
        class="py-3 px-4 h-full flex items-center bg-white border border-gray-300 text-sm font-bold rounded focus:ring focus:outline-none hover:border-gray-400">
        <IconTrash className="-ml-1 h-5 w-5 text-gray-700" />
        <span class="ml-2">Logout & clear local session</span>
      </button>
      <button
        on:click={() => dispatchLogout('logout', true)}
        class="ml-4 py-3 px-4 h-full flex items-center bg-gray-900 text-white font-bold text-sm rounded hover:bg-gray-800 focus:ring focus:outline-none">
        <IconLogout className="h-5 w-5" />
        <span class="ml-2">Logout</span>
      </button>
    </div>
  </div>
  <div class="relative p-4 rounded bg-gray-100">
    <span on:click={handleClickCopy} class="absolute right-4 cursor-pointer">
      <IconDuplicate className="h-6 w-6 text-gray-400 hover:text-gray-500" />
    </span>
    <pre class="text-xs font-mono overflow-x-scroll">
      {jsonUser}
    </pre>
  </div>
</div>
