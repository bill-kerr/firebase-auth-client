<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TextField from './TextField.svelte';
  import PasswordField from './PasswordField.svelte';
  import { isLoginError, login } from '../auth';
  import type { User } from '../user';
  export let email = '';
  export let password = '';
  export let enabled = false;
  let loading = false;
  let dispatch = createEventDispatcher<{ login: User }>();

  async function handleSubmit() {
    loading = true;
    const user = await login(email, password);
    if (!isLoginError(user)) {
      dispatch('login', user);
    }
    loading = false;
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <TextField name="email" bind:value={email} label="Email" />
  </div>
  <div class="mt-2">
    <PasswordField name="password" bind:value={password} label="Password" />
  </div>
  <button
    type="submit"
    disabled={!enabled || loading}
    class="mt-4 p-3 w-full font-bold bg-yellow-400 rounded focus:outline-none focus:ring hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50">Login</button>
</form>
