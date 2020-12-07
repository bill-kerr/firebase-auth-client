<script lang="ts">
  import Modal from './Modal.svelte';
  import IconQuestionMark from '../icons/IconQuestionMark.svelte';
</script>

<Modal>
  <div slot="trigger" let:open>
    <button
      on:click={open}
      class="px-3 py-2 flex items-center border border-gray-300 bg-white font-sm font-bold rounded focus:outline-none focus:ring hover:border-gray-400">
      <IconQuestionMark className="h-5 w-5 text-gray-700" type="solid" />
      <span class="ml-2">What is this?</span>
    </button>
  </div>

  <div slot="header" class="flex items-center">
    <IconQuestionMark className="h-10 w-10 text-yellow-500" type="solid" />
    <h2 class="ml-2 text-3xl font-black">What is this?</h2>
  </div>
  <div slot="content" class="mt-4" let:close>
    <p>
      I'm glad you asked! Firebase Authentication Client is a simple frontend that helps you login
      and get user and authentication details from Google's
      <a class="hyperlink" href="https://firebase.google.com/" target="_blank">Firebase</a>
      service.
    </p>
    <p class="mt-2">
      After building multiple backend applications utilizing Firebase for authentication, it became
      apparent that I needed a way to easily get authentication tokens, evaluate custom claims, and
      other tasks that require a frontend Firebase client. To that end, I created this frontend
      client as a general purpose tool for anyone's use.
    </p>
    <p class="mt-2">
      The application is built with
      <a class="hyperlink" href="https://svelte.dev/" target="_blank">Svelte</a>
      and uses
      <a class="hyperlink" href="https://tailwindcss.com/" target="_blank">TailwindCSS</a>
      for styling.
    </p>
    <div class="mt-4 flex justify-end">
      <button
        class="py-3 px-4 bg-gray-900 text-white font-bold text-sm rounded hover:bg-gray-800 focus:ring focus:outline-none"
        on:click={close}>Got it!</button>
    </div>
  </div>
</Modal>
