<script lang="ts">
  import './Tailwind.svelte';
  import PageHeader from './PageHeader.svelte';
  import ConfigPanel from './ConfigPanel.svelte';
  import LogInOutPanel from './LogInOutPanel.svelte';
  import TokenPanel from './TokenPanel.svelte';
  import NavItem from './NavItem.svelte';
  import IconCog from '../icons/IconCog.svelte';
  import IconKey from '../icons/IconKey.svelte';
  import IconUser from '../icons/IconUser.svelte';

  let configured = false;
  let loggedIn = false;
  let activePanel: 'config' | 'login' | 'token' = 'config';
</script>

<div class="relative h-full min-h-screen">
  <div class="p-6 mx-auto max-w-screen-xl">
    <PageHeader />
    <div class="mt-6 flex items-center space-x-4">
      <NavItem
        title="Configure Firebase"
        on:click={() => (activePanel = 'config')}
        active={activePanel === 'config'}>
        <div slot="icon">
          <IconCog className="w-8 h-8 text-gray-700" />
        </div>
      </NavItem>
      <NavItem
        title="Login/Logout"
        on:click={() => (activePanel = 'login')}
        active={activePanel === 'login'}>
        <div slot="icon">
          <IconUser className="w-8 h-8 text-gray-700" type="solid" />
        </div>
      </NavItem>
      <NavItem
        title="Access Token"
        on:click={() => (activePanel = 'token')}
        active={activePanel === 'token'}>
        <div slot="icon">
          <IconKey className="w-8 h-8 text-gray-700" />
        </div>
      </NavItem>
    </div>
    <div class="mt-4">
      <ConfigPanel
        on:configured={event => (configured = event.detail)}
        active={activePanel === 'config'} />
    </div>
    <div class="mt-4">
      <LogInOutPanel
        enabled={configured}
        on:loggedIn={event => (loggedIn = event.detail)}
        active={activePanel === 'login'} />
    </div>
    <div class="mt-4">
      <TokenPanel enabled={configured && loggedIn} active={activePanel === 'token'} />
    </div>
  </div>
</div>
