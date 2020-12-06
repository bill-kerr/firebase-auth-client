<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Panel from './Panel.svelte';
  import ConfigForm from './ConfigForm.svelte';
  import WarningBadge from './WarningBadge.svelte';
  import IconRefresh from '../icons/IconRefresh.svelte';
  import { initializeFirebase } from '../auth';
  import type { FirebaseConfig } from '../auth';
  import SuccessBadge from './SuccessBadge.svelte';

  export let active: boolean = false;

  const localStorageKey = 'fb-auth-tester-config';
  const dispatchConfigured = createEventDispatcher<{ configured: boolean }>();
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
    dispatchConfigured('configured', configured);
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

<Panel show={active}>
  <div slot="content" class="space-x-4 flex">
    <ConfigForm bind:values on:change={handleChange} />
    <div class="p-4 w-full flex flex-col items-center justify-center bg-gray-100 rounded">
      {#if loading}
        <div class="p-4 rounded-full bg-gray-200" in:fade|local={{ duration: 1000 }}>
          <IconRefresh className="h-10 w-10 text-gray-700 -animate-spin" />
        </div>
      {:else if !configured}
        <WarningBadge message="Configuration Invalid" />
      {:else}
        <SuccessBadge message="Configuration Valid" />
      {/if}
    </div>
  </div>
</Panel>
