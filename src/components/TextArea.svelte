<script lang="ts">
    export let text: string;
</script>

<textarea bind:value={text} class="block w-full h-full p-2p-2 border-primary-dark-2 border-2 rounded-lg whitespace-pre overflow-x-scroll" />

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