<script lang="ts">
  import Tailwind from "./Tailwind.svelte";
  import Header from "./Header.svelte";
  import ConfigBox from "./ConfigBox.svelte";
  import { initializeFirebase } from "../auth";

  async function init() {
    const success = await initializeFirebase({
      apiKey: "",
      appId: "",
      storageBucket: "",
      authDomain: "",
      databaseURL: "",
      messagingSenderId: "",
      projectId: "",
    });
    console.log(success);
  }
  init();
</script>

<div class="antialiased text-gray-900 font-display">
  <div class="px-6 mt-6 mx-auto">
    <Header />
    <div class="mt-12">
      <ConfigBox />
    </div>
  </div>
</div>
