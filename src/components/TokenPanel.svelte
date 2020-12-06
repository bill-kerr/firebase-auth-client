<script lang="ts">
  import { onDestroy } from 'svelte';
  import decode from 'jwt-decode';
  import beautify from 'json-beautify';
  import { getCurrentUser, getNewToken } from '../auth';
  import IconDuplicate from '../icons/IconDuplicate.svelte';
  import IconLockClosed from '../icons/IconLockClosed.svelte';
  import IconRefresh from '../icons/IconRefresh.svelte';
  import JsonSnippet from './JsonSnippet.svelte';
  import Panel from './Panel.svelte';
  import PanelTitle from './PanelTitle.svelte';
  import type { AccessToken } from '../token';

  export let active = false;
  export let enabled = false;

  let token: AccessToken;
  let expireTime: number = 0;
  let tokenPromise = new Promise<void>(res => res());
  let loadingRefresh = false;
  $: minutes = Math.floor(expireTime / 60);
  $: minname = minutes > 1 ? 'mins' : 'min';
  $: seconds = Math.floor(expireTime - minutes * 60);
  $: if (enabled) {
    tokenPromise = getToken();
  }

  const timer = setInterval(() => {
    if (token) {
      expireTime = token.exp - Math.round(+new Date() / 1000);
    }
  }, 1000);

  function decodeAndFormatToken(token: string) {
    const decoded = decode(token);
    return beautify(decoded, null, 2);
  }

  async function getToken() {
    const user = getCurrentUser();
    const tokenString = await user.getIdToken();
    setToken(tokenString);
  }

  function setToken(tokenString: string) {
    const decoded = decode(tokenString) as AccessToken;
    token = { ...decoded, tokenString };
  }

  function handleClickCopy() {
    navigator.clipboard.writeText(token.tokenString);
  }

  async function handleClickRefresh() {
    loadingRefresh = true;
    const tokenString = await getNewToken();
    setToken(tokenString);
    loadingRefresh = false;
  }

  onDestroy(() => clearInterval(timer));
</script>

<Panel show={active}>
  <div slot="header" class="flex items-center justify-between">
    <PanelTitle title="Access Token">
      <div slot="icon">
        <IconLockClosed type="solid" className="h-8 w-8 text-gray-700" />
      </div>
    </PanelTitle>
    {#if loadingRefresh}
      <div class="text-sm px-2 py-1 rounded font-bold text-green-800 bg-green-100">
        Refreshing token...
      </div>
    {:else if enabled && token && expireTime > 0}
      <div class="text-sm px-2 py-1 rounded font-bold text-green-800 bg-green-100">
        Your access token expires in
        {`${minutes + minname} ${seconds}s`}
      </div>
    {:else if enabled && token && expireTime <= 0}
      <div class="text-sm px-2 py-1 rounded font-bold text-red-800 bg-red-100">
        Your access token has expired
      </div>
    {:else}
      <div class="text-sm px-2 py-1 rounded font-bold text-red-800 bg-red-100">
        Login to get an access token
      </div>
    {/if}
  </div>
  <div slot="content">
    {#if !enabled}
      <p>Login to get an access token.</p>
    {:else}
      {#await tokenPromise}
        <div>Loading token....</div>
      {:then}
        <div class="flex space-x-4">
          <div
            class={`p-2 bg-gray-100 border border-gray-300 rounded font-mono overflow-x-scroll ${loadingRefresh && 'opacity-50'}`}>
            <pre class="p-2 text-sm">
              {token.tokenString}
            </pre>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <button
              on:click={handleClickCopy}
              class="py-3 px-4 h-full flex flex-shrink-0 items-center bg-gray-900 text-white font-bold text-sm rounded hover:bg-gray-800 focus:ring focus:outline-none">
              <IconDuplicate className="h-6 w-6" />
              <span class="ml-2">Copy to Clipboard</span>
            </button>
            <button
              on:click={handleClickRefresh}
              disabled={loadingRefresh}
              class="ml-4 py-3 px-4 h-full flex flex-shrink-0 items-center bg-white border border-gray-300 text-sm font-bold rounded focus:ring focus:outline-none hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed">
              <IconRefresh
                className={`h-6 w-6 text-gray-700 ${loadingRefresh && '-animate-spin'}`} />
              <span class="ml-2">Refresh Token</span>
            </button>
          </div>
        </div>
        <div class={`mt-4 ${loadingRefresh && 'opacity-50'}`}>
          <JsonSnippet content={decodeAndFormatToken(token.tokenString)} />
        </div>
      {/await}
    {/if}
  </div>
</Panel>
