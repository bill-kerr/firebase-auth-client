<script lang="ts">
  export let name: string;
  export let value: string;
  export let label: string;
  export let error: boolean;
</script>

<div class="flex items-center">
  <label class="w-56" for={name}>{label}</label>
  <input
    class={`ml-2 p-2 w-full border border-gray-300 bg-gray-50 ${error && 'border-red-300 bg-red-50'} focus:outline-none focus:ring rounded focus:bg-white focus:border-blue-400`}
    type="password"
    {name}
    on:focus={this.setSelectionRange(0, value.length)}
    on:change
    on:blur
    bind:value />
</div>
