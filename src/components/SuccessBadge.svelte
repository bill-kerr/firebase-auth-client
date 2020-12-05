<script lang="ts">
  import { fade } from 'svelte/transition';
  import IconCheck from '../icons/IconCheck.svelte';
  export let message: string;
</script>

<div class="p-4 rounded-full bg-green-200" in:fade|local>
  <IconCheck className="h-10 w-10 text-green-700" />
</div>
<p class="mt-2 text-green-700 text-sm font-bold">{message}</p>
