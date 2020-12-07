<script lang="ts">
  import { fade } from 'svelte/transition';
  import IconExclamation from '../icons/IconExclamation.svelte';
  export let message: string;
</script>

<div class="flex flex-col items-center">
  <div class="p-4 rounded-full bg-red-200" in:fade|local>
    <IconExclamation className="h-10 w-10 text-red-700" />
  </div>
  <p class="mt-2 text-red-700 font-bold">{message}</p>
</div>
