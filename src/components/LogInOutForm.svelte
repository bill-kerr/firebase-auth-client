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
  let errorState = false;
  let dispatchSuccess = createEventDispatcher<{ login: User }>();
  let dispatchError = createEventDispatcher<{ error: boolean }>();

  async function handleSubmit() {
    loading = true;
    const user = await login(email, password);
    if (!isLoginError(user)) {
      dispatchSuccess('login', user);
    } else {
      dispatchError('error', true);
      errorState = true;
    }
    loading = false;
  }

  function handleBlur() {
    errorState = false;
    dispatchError('error', false);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <TextField
      name="email"
      bind:value={email}
      label="Email"
      error={errorState}
      on:blur={handleBlur} />
  </div>
  <div class="mt-2">
    <PasswordField
      name="password"
      bind:value={password}
      label="Password"
      error={errorState}
      on:blur={handleBlur} />
  </div>
  <button
    type="submit"
    disabled={!enabled || loading}
    class="mt-4 p-3 w-full font-bold bg-yellow-400 rounded focus:outline-none focus:ring hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50">
    {#if loading}Logging in...{:else}Login{/if}
  </button>
</form>
