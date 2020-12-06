<script lang="ts">
  import IconDuplicate from '../icons/IconDuplicate.svelte';

  export let content: string = '';

  function handleClickCopy() {
    navigator.clipboard.writeText(content);
  }
</script>

<div class="relative p-4 rounded bg-gray-100">
  <span on:click={handleClickCopy} class="absolute right-4 cursor-pointer">
    <IconDuplicate className="h-6 w-6 text-gray-400 hover:text-gray-500" />
  </span>
  <pre class="text-xs font-mono overflow-x-scroll">
      {content}
    </pre>
</div>
