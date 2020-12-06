<script lang="ts">
  import './Tailwind.svelte';
  import PageHeader from './PageHeader.svelte';
  import ConfigPanel from './ConfigPanel.svelte';
  import LogInOutPanel from './LogInOutPanel.svelte';
  import TokenPanel from './TokenPanel.svelte';

  let configured = false;
  let loggedIn = false;
</script>

<div class="relative h-full min-h-screen">
  <div class="p-6 mx-auto max-w-screen-xl">
    <PageHeader />
    <div class="mt-12">
      <ConfigPanel on:configured={event => (configured = event.detail)} />
    </div>
    <div class="mt-6">
      <LogInOutPanel enabled={configured} on:loggedIn={event => (loggedIn = event.detail)} />
    </div>
    <div class="mt-6">
      <TokenPanel enabled={loggedIn} />
    </div>
  </div>
</div>
