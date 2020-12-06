<script lang="ts">
  export let title: string;
</script>

<div class="flex items-center">
  <slot name="icon" />
  <span class="ml-4 text-2xl font-black whitespace-nowrap">{title}</span>
</div>
