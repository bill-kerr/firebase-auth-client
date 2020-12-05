<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Panel from './Panel.svelte';
  import PanelTitle from './PanelTitle.svelte';
  import ConfigForm from './ConfigForm.svelte';
  import IconCog from '../icons/IconCog.svelte';
  import IconRefresh from '../icons/IconRefresh.svelte';
  import IconExclamation from '../icons/IconExclamation.svelte';
  import IconCheck from '../icons/IconCheck.svelte';
  import { initializeFirebase } from '../auth';
  import type { FirebaseConfig } from '../auth';

  const localStorageKey = 'fb-auth-tester-config';
  const dispatch = createEventDispatcher<{ configured: boolean }>();
  let configured = false;
  let loading = false;
  let values = getInitialValues();

  onMount(async () => {
    await handleChange();
  });

  async function handleChange() {
    configured = false;
    loading = true;
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    configured = await initializeFirebase(values);
    dispatch('configured', configured);
    loading = false;
  }

  function getInitialValues(): FirebaseConfig {
    const storedValues = localStorage.getItem(localStorageKey);
    if (storedValues) {
      return JSON.parse(storedValues) as FirebaseConfig;
    }
    return {
      apiKey: '',
      appId: '',
      authDomain: '',
      databaseURL: '',
      messagingSenderId: '',
      projectId: '',
      storageBucket: '',
    };
  }
</script>

<Panel>
  <div slot="header" class="flex items-center justify-between">
    <PanelTitle title="Firebase Config">
      <div slot="icon">
        <IconCog className="w-6 h-6 text-yellow-900" />
      </div>
    </PanelTitle>
    {#if configured}
      <div class="text-sm px-2 py-1 rounded font-bold text-green-800 bg-green-100">Configured</div>
    {:else}
      <div class="text-sm px-2 py-1 rounded font-bold text-red-800 bg-red-100">Not configured</div>
    {/if}
  </div>
  <div slot="content" class="space-x-4 flex">
    <ConfigForm bind:values on:change={handleChange} />
    <div class="p-4 w-full flex flex-col items-center justify-center bg-gray-100 rounded">
      {#if loading}
        <div class="p-4 rounded-full bg-gray-200" in:fade|local={{ duration: 1000 }}>
          <IconRefresh className="h-10 w-10 text-gray-700 -animate-spin" />
        </div>
      {:else if !configured}
        <div class="p-4 rounded-full bg-red-200" in:fade|local>
          <IconExclamation className="h-10 w-10 text-red-700" />
        </div>
        <p class="mt-2 text-red-700 text-sm font-bold">Configuration Invalid</p>
      {:else}
        <div class="p-4 rounded-full bg-green-200" in:fade|local>
          <IconCheck className="h-10 w-10 text-green-700" />
        </div>
        <p class="mt-2 text-green-700 text-sm font-bold">Configuration Valid</p>
      {/if}
    </div>
  </div>
</Panel>
