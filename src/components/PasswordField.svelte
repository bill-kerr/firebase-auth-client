<script lang="ts">
  export let name: string;
  export let value: string;
  export let label: string;
</script>

<div class="flex items-center">
  <label class="w-56" for={name}>{label}</label>
  <input
    class="ml-2 p-2 w-full border border-gray-300 bg-gray-50 focus:outline-none focus:ring rounded focus:bg-white"
    type="password"
    {name}
    on:focus={this.setSelectionRange(0, value.length)}
    on:change
    bind:value />
</div>
