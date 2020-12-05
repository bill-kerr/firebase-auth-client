<script lang="ts">
  import Tailwind from './Tailwind.svelte';
  import PageHeader from './PageHeader.svelte';
  import ConfigPanel from './ConfigPanel.svelte';
</script>

<div>
  <div class="px-6 mt-6 mx-auto max-w-screen-xl">
    <PageHeader />
    <div class="mt-12">
      <ConfigPanel />
    </div>
  </div>
</div>
