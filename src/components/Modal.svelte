<script lang="ts">
  import { fade } from 'svelte/transition';
  import IconX from '../icons/IconX.svelte';

  let isOpen = false;

  function open() {
    isOpen = true;
  }

  function close() {
    isOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key === 'Escape') {
      close();
    }
  }
</script>

<slot name="trigger" {open} />

{#if isOpen}
  <div
    transition:fade={{ duration: 100 }}
    class="fixed inset-0 h-screen max-h-screen flex items-center justify-center focus:outline-none z-10"
    on:keydown={handleKeydown}
    on:click={close}
    tabindex={0}>
    <div class="absolute h-full w-full bg-gray-900 bg-opacity-50" />
    <div class="m-6 p-6 z-20 max-w-screen-md bg-white rounded shadow" on:click|stopPropagation>
      <div class="flex justify-between items-start">
        <slot name="header" {close} />
        <button on:click={close} class="focus:outline-none focus:ring rounded">
          <IconX className="h-6 w-6 text-gray-500 hover:text-gray-600" />
        </button>
      </div>
      <slot name="content" {close} />
    </div>
  </div>
{/if}
