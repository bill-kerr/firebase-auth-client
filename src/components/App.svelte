<script lang="ts">
  import Tailwind from './Tailwind.svelte';
  import PageHeader from './PageHeader.svelte';
  import ConfigPanel from './ConfigPanel.svelte';
  import Panel from './Panel.svelte';
  import PanelTitle from './PanelTitle.svelte';
</script>

<div>
  <div class="px-6 mt-6 mx-auto">
    <PageHeader />
    <div class="mt-12">
      <Panel>
        <div slot="header">
          <PanelTitle title="Firebase Config">
            <svg
              class="w-6 h-6 text-yellow-900"
              slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"><path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd" />
            </svg>
          </PanelTitle>
        </div>
        <div slot="content">test</div>
      </Panel>
    </div>
  </div>
</div>
