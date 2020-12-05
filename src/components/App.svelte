<script lang="ts">
  import './Tailwind.svelte';
  import PageHeader from './PageHeader.svelte';
  import ConfigPanel from './ConfigPanel.svelte';
  import LogInOutPanel from './LogInOutPanel.svelte';

  let configured = false;
</script>

<div>
  <div class="p-6 mx-auto max-w-screen-xl">
    <PageHeader />
    <div class="mt-12">
      <ConfigPanel on:configured={event => (configured = event.detail)} />
    </div>
    <div class="mt-6">
      <LogInOutPanel enabled={configured} />
    </div>
  </div>
</div>
