<script lang="ts">
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import decode from "jwt-decode";
  import beautify from "json-beautify";
  import { getCurrentUser, getNewToken } from "../auth";
  import IconDuplicate from "../icons/IconDuplicate.svelte";
  import IconRefresh from "../icons/IconRefresh.svelte";
  import JsonSnippet from "./JsonSnippet.svelte";
  import Panel from "./Panel.svelte";
  import type { AccessToken } from "../types";
  import WarningBadge from "./WarningBadge.svelte";

  export let active = false;
  export let enabled = false;

  let token: AccessToken;
  let expireTime: number = 0;
  let tokenPromise = new Promise<void>((res) => res());
  let loadingRefresh = false;
  let copied = false;
  $: minutes = Math.floor(expireTime / 60);
  $: minname = minutes > 1 ? "mins" : "min";
  $: seconds = Math.floor(expireTime - minutes * 60);
  $: if (enabled) {
    tokenPromise = getToken();
  }

  const timer = setInterval(setExpireTime, 1000);

  function setExpireTime() {
    if (token) {
      expireTime = token.exp - Math.round(+new Date() / 1000);
    }
  }

  function decodeAndFormatToken(token: string) {
    const decoded = decode(token);
    return beautify(decoded, null, 2);
  }

  async function getToken() {
    const user = getCurrentUser();
    if (user) {
      const tokenString = await user.getIdToken();
      setToken(tokenString);
    }
  }

  function setToken(tokenString: string) {
    const decoded = decode(tokenString) as AccessToken;
    token = { ...decoded, tokenString };
    setExpireTime();
  }

  function handleClickCopy() {
    setCopied();
    navigator.clipboard.writeText(token.tokenString);
  }

  function setCopied() {
    if (copied) {
      return;
    }
    copied = true;
    setTimeout(() => (copied = false), 1000);
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
  <div slot="content">
    {#if !enabled}
      <WarningBadge message="Login to get an access token" />
    {:else}
      {#await tokenPromise}
        <div>Loading token....</div>
      {:then}
        <div class="flex space-x-4">
          <div
            class={`p-2 bg-gray-100 border border-gray-300 rounded font-mono overflow-x-scroll ${loadingRefresh && 'opacity-50'}`}>
            <pre
              class="p-2 text-sm">
              {token.tokenString}
            </pre>
          </div>
          <div class="flex flex-shrink-0 items-center">
            <button
              on:click={handleClickCopy}
              class="relative py-3 px-4 h-full flex flex-shrink-0 items-center bg-gray-900 text-white font-bold text-sm rounded hover:bg-gray-800 focus:ring focus:outline-none">
              <IconDuplicate className="h-6 w-6" />
              <span class="ml-2">Copy to Clipboard</span>
              {#if copied}
                <div class="absolute top-full inset-x-0 z-10">
                  <div class="mt-2 flex justify-center">
                    <span
                      class="bg-gray-900 bg-opacity-75 text-xs font-normal rounded py-0.5 px-1">Copied!</span>
                  </div>
                </div>
              {/if}
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
        <div class="mt-4 p-4 rounded-lg bg-yellow-100">
          {#if expireTime === 0}
            <p>Your token is expired. Click refresh token to renew it.</p>
          {:else}
            <p>
              Your token expires in
              <span class="font-bold">{minutes}{minname} {seconds}s</span>.
            </p>
          {/if}
        </div>
        <div class={`mt-4 ${loadingRefresh && 'opacity-50'}`}>
          <JsonSnippet content={decodeAndFormatToken(token.tokenString)} />
        </div>
      {/await}
    {/if}
  </div>
</Panel>
