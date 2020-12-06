<script lang="ts">
  export let show: boolean = false;
</script>

{#if show}
  <div class="p-4 bg-white shadow rounded">
    <slot name="content" />
  </div>
{/if}
