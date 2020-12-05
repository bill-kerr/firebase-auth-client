<script lang="ts">
  import { onMount } from 'svelte';
  import { initializeFirebase } from '../auth';
  import StepLabel from './PanelTitle.svelte';
  import TextField from './TextField.svelte';

  const localStorageKey = 'fb-auth-tester-config';

  let loading = false;
  let show = false;
  let configured = false;
  let values = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  };

  onMount(async () => {
    await handleChange();
  });

  const storedValues = localStorage.getItem(localStorageKey);
  if (storedValues) {
    values = JSON.parse(storedValues);
  }

  async function handleChange() {
    configured = false;
    loading = true;
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    configured = await initializeFirebase(values);
    loading = false;
  }
</script>

<div class="bg-white shadow rounded">
  <div
    class="p-4 flex items-center justify-between border-b border-gray-100 cursor-pointer"
    on:click={() => (show = !show)}>
    <StepLabel title="Firebase Config" />
    {#if configured}
      <div class="text-sm px-2 py-1 rounded font-bold text-green-800 bg-green-100">Configured</div>
    {:else}
      <div class="text-sm px-2 py-1 rounded font-bold text-red-800 bg-red-100">Not configured</div>
    {/if}
  </div>
  {#if show}
    <div class="p-4 flex space-x-4">
      <div class="w-1/2 flex-shrink-0">
        <div class="space-y-2">
          <TextField
            name="apiKey"
            bind:value={values.apiKey}
            label="apiKey"
            on:change={handleChange} />
          <TextField
            name="authDomain"
            bind:value={values.authDomain}
            on:change={handleChange}
            label="authDomain" />
          <TextField
            name="databaseURL"
            bind:value={values.databaseURL}
            on:change={handleChange}
            label="databaseURL" />
          <TextField
            name="projectId"
            bind:value={values.projectId}
            on:change={handleChange}
            label="projectId" />
          <TextField
            name="storageBucket"
            bind:value={values.storageBucket}
            on:change={handleChange}
            label="storageBucket" />
          <TextField
            name="messagingSenderId"
            bind:value={values.messagingSenderId}
            on:change={handleChange}
            label="messagingSenderId" />
          <TextField
            name="appId"
            bind:value={values.appId}
            on:change={handleChange}
            label="appId" />
        </div>
      </div>
      <div>lsdkflkj</div>
    </div>
  {/if}
</div>
