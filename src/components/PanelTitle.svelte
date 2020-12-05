<script lang="ts">
  export let title: string;
</script>

<div class="flex items-center">
  <div
    class="p-2 flex items-center justify-center font-black rounded-full bg-yellow-200 flex-shrink-0">
    <slot name="icon" />
  </div>
  <span class="ml-4 text-2xl font-bold whitespace-nowrap">{title}</span>
</div>
