<script lang="ts">
    export let srText = '';
    export let toggledState = false; //bindable
    export let onClick = () => null;

    const internalOnClick = () => {
        toggledState = !toggledState;
        onClick();
    }
</script>

<button on:click={internalOnClick} type="button" class="h-min inline-flex items-center justify-center space-x-1 p-2 rounded-md text-primary-dark-2 hover:text-primary-dark-1 hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-2" aria-expanded="false">
    {#if srText}
        <span class="sr-only">{srText}</span>
    {/if}
    <slot name="left" />
    <slot />
    <slot name="right" />
</button>
