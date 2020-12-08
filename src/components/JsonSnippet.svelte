<script lang="ts">
  import { fade } from 'svelte/transition';
  import IconDuplicate from '../icons/IconDuplicate.svelte';

  export let content: string = '';

  let copied = false;

  function handleClickCopy() {
    navigator.clipboard.writeText(content);
    setCopy();
  }

  function setCopy() {
    if (copied) {
      return;
    }
    copied = true;
    setTimeout(() => (copied = false), 1000);
  }
</script>

<div class="relative p-4 rounded bg-gray-100">
  <div class="absolute right-4">
    <div class="flex items-center">
      {#if copied}
        <span
          class="py-0.5 px-1 text-xs text-white mr-1 bg-gray-900 bg-opacity-75 rounded"
          transition:fade={{ duration: 150 }}>Copied!</span>
      {/if}
      <span on:click={handleClickCopy} class="cursor-pointer">
        <IconDuplicate className="h-6 w-6 text-gray-400 hover:text-gray-500" />
      </span>
    </div>
  </div>
  <pre class="text-xs font-mono overflow-x-scroll">
    {content}
  </pre>
</div>
