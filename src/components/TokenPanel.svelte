<script lang="ts">
  import decode from 'jwt-decode';
  import beautify from 'json-beautify';
  import { getCurrentUser } from '../auth';
  import IconDuplicate from '../icons/IconDuplicate.svelte';
  import IconLockClosed from '../icons/IconLockClosed.svelte';
  import IconRefresh from '../icons/IconRefresh.svelte';
  import JsonSnippet from './JsonSnippet.svelte';
  import Panel from './Panel.svelte';
  import PanelTitle from './PanelTitle.svelte';

  export let enabled = false;
  let user: ReturnType<typeof getCurrentUser>;
  let token: string = '';
  $: tokenPromise = enabled ? getToken() : new Promise<string>(res => res(''));

  function decodeToken(token: string) {
    const decoded = decode(token);
    return beautify(decoded, null, 2);
  }

  async function getToken() {
    const user = getCurrentUser();
    const token = await user.getIdToken();
    return token;
  }
</script>

<Panel>
  <div slot="header">
    <PanelTitle title="Access Token">
      <div slot="icon">
        <IconLockClosed type="solid" className="h-8 w-8 text-gray-700" />
      </div>
    </PanelTitle>
  </div>
  <div slot="content">
    {#if !enabled}
      <p>Login to get an access token.</p>
    {:else}
      {#await tokenPromise}
        <span>waiting....</span>
      {:then tokenString}
        <div class="flex space-x-4">
          <div
            class="p-2 w-2/3 bg-gray-100 border border-gray-300 rounded whitespace-nowrap font-mono">
            <pre class="p-2 overflow-x-scroll">
              {tokenString}
            </pre>
          </div>
          <div class="flex-1 flex items-center">
            <button
              class="flex-1 py-3 px-4 h-full flex items-center bg-gray-900 text-white font-bold text-sm rounded hover:bg-gray-800 focus:ring focus:outline-none">
              <IconDuplicate className="h-6 w-6" />
              <span class="ml-2">Copy to Clipboard</span>
            </button>
            <button
              class="ml-4 py-3 px-4 h-full flex items-center bg-white border border-gray-300 text-sm font-bold rounded focus:ring focus:outline-none hover:border-gray-400">
              <IconRefresh className="h-6 w-6 text-gray-700" />
              <span class="ml-2">Refresh Token</span>
            </button>
          </div>
        </div>
        <div class="mt-4">
          <JsonSnippet content={decodeToken(tokenString)} />
        </div>
      {/await}
    {/if}
  </div>
</Panel>
