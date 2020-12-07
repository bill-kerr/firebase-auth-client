<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let onClasses: string = 'bg-yellow-400';
  export let offClasses: string = 'bg-gray-400';
  export let initial: boolean = false;

  const progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let on = initial;
  let dispatchToggle = createEventDispatcher<{ on: boolean }>();

  function handleToggle() {
    on = !on;
    dispatchToggle('on', on);
  }
</script>

<button
  tabindex={0}
  class={`p-0.5 w-14 h-7 flex items-center rounded-full ${on ? onClasses : offClasses} focus-visible:ring-blue-300 focus-visible:ring-opacity-50 focus:outline-none transition-colors duration-150`}
  on:click={handleToggle}>
  <span class="h-6 w-6 bg-white rounded-full" />
</button>
