<script lang="ts">
  import Panel from './Panel.svelte';
  export let enabled = false;
</script>

<Panel>
  <div slot="header" class="flex items-center justify-between">Header</div>
  <div slot="content" class="flex items-center">Content</div>
</Panel>
