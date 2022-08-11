<script lang="ts">
    export let text = '';
</script>

<div class="w-full h-full p-2 border-primary-dark-2 border-2 rounded-lg whitespace-pre overflow-x-scroll">
    <slot />
    {#if text}
        text
    {/if}
</div>

<style>
    div { 
        scrollbar-color: var(--secondary-dark-0) var(--secondary-1);
        scrollbar-width: thin;
    }
    div::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    div::-webkit-scrollbar-track {
        background: var(--secondary-1);
    }
    div::-webkit-scrollbar-thumb {
        background: var(--secondary-dark-0);
    }
</style>