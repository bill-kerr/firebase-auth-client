<script lang="ts">
  import { onMount } from 'svelte';
  import Panel from './Panel.svelte';
  import PanelTitle from './PanelTitle.svelte';
  import ConfigForm from './ConfigForm.svelte';
  import IconCog from '../icons/IconCog.svelte';
  import { initializeFirebase } from '../auth';
  import type { FirebaseConfig } from '../auth';

  const localStorageKey = 'fb-auth-tester-config';
  let configured = false;
  let loading = false;
  let values = getInitialValues();

  onMount(() => {
    handleChange();
  });

  async function handleChange() {
    configured = false;
    loading = true;
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    configured = await initializeFirebase(values);
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
  </div>
</Panel>
