<script lang="ts">
    type Link = {
        href: string;
        text: string;
    }
    export let links: Array<Link>;
    export let activeHref: string = '';
</script>

<div class="px-2 pt-2 pb-3 space-y-1">
    {#each links as link}
        {#if link.href == activeHref}
            <a href={link.href} class="bg-primary-1 text-primary-dark-1 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">{link.text}</a>
        {:else}
            <a href={link.href} class="text-primary-dark-2 hover:bg-primary-1 hover:text-primary-dark-1 block px-3 py-2 rounded-md text-base font-medium">{link.text}</a>
        {/if}
    {/each}
</div>