<script lang="ts">
  import type { FirebaseConfig } from '../auth';

  import TextField from './TextField.svelte';
  export let values: FirebaseConfig;
</script>

<div class="space-y-2 w-1/2 flex-shrink-0">
  {#each Object.keys(values) as key}
    <TextField name={key} bind:value={values[key]} label={key} on:change />
  {/each}
</div>
