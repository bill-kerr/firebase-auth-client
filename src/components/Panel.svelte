<script lang="ts">
  let show = false;
</script>

<div class="bg-white shadow rounded">
  <div
    class={`p-4 ${show && 'border-b'} border-gray-100 cursor-pointer select-none`}
    on:click={() => (show = !show)}>
    <slot name="header" />
  </div>
  {#if show}
    <div class="p-4">
      <slot name="content" />
    </div>
  {/if}
</div>
