<script lang="ts">
  export let title: string = '';
  export let active: boolean = false;
</script>

<div
  on:click
  class={`mt-2 p-4 bg-white rounded shadow cursor-pointer select-none ${active && 'ring ring-yellow-300 ring-opacity-50 bg-yellow-50'}`}>
  <div class="flex">
    <slot name="icon" />
    <span class="ml-2 text-2xl font-black whitespace-nowrap">{title}</span>
  </div>
</div>
