<script lang="ts">
  import IconFire from '../icons/IconFire.svelte';
  import IconQuestionMark from '../icons/IconQuestionMark.svelte';
</script>

<div class="flex items-center justify-between">
  <div class="flex items-center">
    <div>
      <IconFire className="h-12 w-12 text-yellow-500" type="solid" />
    </div>
    <div class="ml-2">
      <h1 class="font-black text-3xl">Firebase Authentication Client</h1>
      <p class="text-gray-600">
        A simple tool to help test backends that use Firebase authentication.
      </p>
    </div>
  </div>
  <button
    class="px-3 py-2 flex items-center border border-gray-300 bg-white font-sm font-bold rounded focus:outline-none focus:ring hover:border-gray-400">
    <IconQuestionMark className="h-5 w-5 text-gray-700" type="solid" />
    <span class="ml-2">What is this?</span>
  </button>
</div>
