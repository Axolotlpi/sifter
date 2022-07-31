<script lang="ts">
    export let text = "";
    export let wrap = true;
</script>

<textarea bind:value={text} class="w-full h-full p-2 border-primary-dark-2 border-2 rounded-lg overflow-x-scroll" wrap={wrap ? "soft" : "off"}/>

<style>
    textarea { 
        scrollbar-color: var(--secondary-dark-0) var(--secondary-1);
        scrollbar-width: thin;
    }
    textarea::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    textarea::-webkit-scrollbar-track {
        background: var(--secondary-1);
    }
    textarea::-webkit-scrollbar-thumb {
        background: var(--secondary-dark-0);
    }
</style>