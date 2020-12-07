<script lang="ts">
  import { fade } from 'svelte/transition';
  export let show: boolean = false;
</script>

{#if show}
  <div class="p-4 bg-white shadow rounded" in:fade={{ duration: 150 }}>
    <slot name="content" />
  </div>
{/if}
