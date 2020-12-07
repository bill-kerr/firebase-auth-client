<script lang="ts">
  import IconAdjustments from '../icons/IconAdjustments.svelte';
  import IconBadgeCheck from '../icons/IconBadgeCheck.svelte';
  import Modal from './Modal.svelte';
  import ToggleButton from './ToggleButton.svelte';
</script>

<Modal>
  <div slot="trigger" let:open>
    <button
      on:click={open}
      class="ml-2 px-3 py-2 flex items-center border border-gray-300 bg-white font-sm font-bold rounded focus:outline-none focus:ring hover:border-gray-400">
      <IconAdjustments className="h-5 w-5 text-gray-700" />
      <span class="ml-2">Preferences</span>
    </button>
  </div>

  <div slot="header">
    <h2 class="ml-2 text-3xl font-black">Preferences</h2>
  </div>

  <div slot="content">
    <ul class="mt-8">
      <li class="flex items-center">
        <div class="p-2 rounded-full bg-gray-200">
          <IconBadgeCheck className="h-6 w-6 text-gray-700" type="solid" />
        </div>
        <div class="ml-4 leading-tight">
          <h3 class="text-lg font-bold">Auto-Login</h3>
          <p class="text-gray-600">
            If Firebase detects a user, you will be automatically logged in.
          </p>
        </div>
        <div class="ml-16">
          <ToggleButton />
        </div>
      </li>
    </ul>
  </div>
</Modal>
