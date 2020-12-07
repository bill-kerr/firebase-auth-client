<script lang="ts">
  import IconFire from '../icons/IconFire.svelte';
  import AboutModal from './AboutModal.svelte';
  import PreferencesModal from './PreferencesModal.svelte';
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
  <div class="flex items-center">
    <AboutModal />
    <PreferencesModal />
  </div>
</div>
