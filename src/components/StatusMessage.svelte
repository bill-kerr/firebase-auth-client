<script lang="ts">
  import type { StatusMessage } from '../types';

  export let status: StatusMessage = { disposition: 'positive', message: '' };
</script>

{#if status.message !== ''}
  {#if status.disposition === 'positive'}
    <div class="text-sm px-2 py-1 rounded font-bold text-green-800 bg-green-100">
      {status.message}
    </div>
  {:else}
    <div class="text-sm px-2 py-1 rounded font-bold text-red-800 bg-red-100">{status.message}</div>
  {/if}
{/if}
