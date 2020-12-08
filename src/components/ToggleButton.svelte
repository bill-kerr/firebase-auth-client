<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let initial: boolean = false;

  let toggled = initial;
  let dispatchToggle = createEventDispatcher<{ toggled: boolean }>();

  function handleToggle() {
    toggled = !toggled;
    dispatchToggle('toggled', toggled);
  }
</script>

<button
  tabindex={0}
  class={`relative w-14 h-7 flex items-center rounded-full ${toggled ? 'bg-yellow-400' : 'bg-gray-400'} focus-visible:ring-blue-300 focus-visible:ring-opacity-50 focus:outline-none transition-colors duration-150`}
  on:click={handleToggle}>
  <span
    class={`absolute inset-y-0.5 h-6 w-6 bg-white rounded-full transform transition-transform duration-150 ${toggled ? 'translate-x-full left-1.5' : 'left-0.5'}`} />
</button>
