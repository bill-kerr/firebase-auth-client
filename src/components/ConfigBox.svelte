<script lang="ts">
  import { initializeFirebase } from "../auth";
  import StepLabel from "./StepLabel.svelte";
  import TextField from "./TextField.svelte";

  let test: string = "";
  const localStorageKey = "fb-auth-tester-config";

  interface FormValues {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  }
  let defaultValues: FormValues = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  };
  let values: FormValues = JSON.parse(
    localStorage.getItem(localStorageKey) || JSON.stringify(defaultValues)
  );

  async function handleChange() {
    const success = await initializeFirebase(values);
    console.log(success);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
  }
</script>

<div class="flex space-x-4">
  <div class="w-1/2">
    <StepLabel number={1} title="Paste your Firebase config here..." />
    <div class="mt-4 space-y-2">
      <TextField
        name="apiKey"
        bind:value={values.apiKey}
        label="apiKey"
        on:input={handleChange} />
      <TextField
        name="authDomain"
        bind:value={values.authDomain}
        on:input={handleChange}
        label="authDomain" />
      <TextField
        name="databaseURL"
        bind:value={values.databaseURL}
        on:input={handleChange}
        label="databaseURL" />
      <TextField
        name="projectId"
        bind:value={values.projectId}
        on:input={handleChange}
        label="projectId" />
      <TextField
        name="storageBucket"
        bind:value={values.storageBucket}
        on:input={handleChange}
        label="storageBucket" />
      <TextField
        name="messagingSenderId"
        bind:value={values.messagingSenderId}
        on:input={handleChange}
        label="messagingSenderId" />
      <TextField
        name="appId"
        bind:value={values.appId}
        on:input={handleChange}
        label="appId" />
    </div>
  </div>
  <div>{test}</div>
</div>
