<script lang="ts">
    import Button from "../Button.svelte";

    export let schema;
    export let editedObject;

    var properties;

        properties = Object.entries(schema);
    console.log(schema)
    console.log(properties)

</script>

<div class="grid grid-cols-5 col grid-flow-row gap-2">
    {#each properties as [label, type]}
        <label class="bg-primary-1 p-2 col-span-5 sm:col-span-1">{label} </label>
        {#if type == 'immutable'}
            <input type="text" readonly class="border-solid border-2 rounded-md col-span-4 p-1 border-secondary-dark-0 bg-primary-1" bind:value={editedObject[label]}>
        {:else if type == 'string'}
            <input type="text" class="border-solid border-2 rounded-md col-span-4 p-1 border-secondary-dark-0" bind:value={editedObject[label]}>
        {:else if type == 'number'}
            <input type="number" class="border-solid border-2 rounded-md col-span-4 p-1 border-secondary-dark-0" bind:value={editedObject[label]}>
        {:else if type == 'color'}
            <input type="color" class="border-solid border-2 rounded-md col-span-4 p-1 border-secondary-dark-0" bind:value={editedObject[label]}>
        {:else}
            {#if Array.isArray(type)}
            <div class="flex flex-col col-span-5 sm:col-span-4 p-1">
                {#each editedObject[label] as item, index}
                    <div class="py-1 flex border-solid bg-primary-1 border-primary-2 border-y-2">
                        <div>
                            <Button onClick={() => {editedObject[label].splice(index, 1), editedObject = editedObject}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div>
                        <svelte:self schema={schema[label][0]} bind:editedObject={editedObject[label][index]} />
                    </div>
                {/each}
                <Button onClick={() => {editedObject[label].push(Object.assign({}, editedObject[label].slice(-1)[0])); editedObject = editedObject}}> 
                    <svg slot="left" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>duplicate item</p>
                </Button>
            </div>
            {:else}
                <svelte:self schema={schema[label]} bind:editedObject={editedObject[label]} />
            {/if}
        {/if}
    {/each}
</div>

