<script lang="ts">
    export let text: string = '';
    export let className: string = '';
    export let id: string = '';
    export let lineBreak = false;
    export let lineNum = '';
    export let highlight = []; //start index (inclusive) and end index (exclusive)
    export let highlightColor = '';
    export let highlightLink = '';
    export let onClick = null;
    let preText = '';
    let mainText = text;
    let postText = '';

    if(highlight.length != 0){
        preText = text.substring(0,highlight[0]);
        mainText = text.substring(highlight[0], highlight[1]);
        postText = text.substring(highlight[1]);
    }
</script>

<span class={className + ' lineNums'} {id} style={`--line-number: "${lineNum}";`}>
    {#if highlight.length != 0}
    <!-- ugly stacked tags due to svelte's whitespace handling (avoiding whitespace) -->
        {#if preText}{preText}{/if}<span style="background-color:{highlightColor};">
            {#if highlightLink}
                <a href={highlightLink}>
                    {mainText}
                </a>
            {:else if onClick}
                <button on:click={onClick}
                    >{mainText}</button
            >{:else}{mainText}{/if}</span>{#if postText}{postText}{/if}
    {:else}
        {mainText}
    {/if}
</span>{#if lineBreak}<br />{/if}

<style>
    .lineNums::before {
        content: var(--line-number);
        display: inline-flex;
        color: var(--primary-dark-0);
        font-size: small;
        width: 2em;
        padding-right: 0.2em;
        align-items: center;
        justify-content: flex-end;
        text-overflow: clip;
    }
</style>
