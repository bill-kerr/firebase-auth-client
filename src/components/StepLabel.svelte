<script lang="ts">
  export let number: number;
  export let title: string;
</script>

<div class="flex items-center">
  <div
    class="h-8 w-8 flex items-center justify-center font-black rounded-full bg-yellow-200 flex-shrink-0">
    <span>{number}</span>
  </div>
  <span class="ml-2 text-2xl font-bold whitespace-nowrap">{title}</span>
</div>
