<script lang="ts">
    type Link = {
        href: string;
        text: string;
    }
    export let links: Array<Link>;
    export let activeHref: string = '';
</script>

<div class="flex space-x-4">
    {#each links as link}
        {#if link.href == activeHref}
            <a href={link.href} class="inline-flex items-center justify-center p-2 rounded-md text-primary-dark-1 bg-primary-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-2" aria-current="page">{link.text}</a>
        {:else}
            <a href={link.href} class="inline-flex items-center justify-center p-2 rounded-md text-primary-dark-2 hover:text-primary-dark-1 hover:bg-primary-1 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-2">{link.text}</a>
        {/if}
    {/each}
</div>