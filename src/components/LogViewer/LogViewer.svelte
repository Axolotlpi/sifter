<script lang="ts">
    import TextView from "./TextView.svelte";
    import FileInput from '../compositions/FileInput.svelte';
    import Button from "../Button.svelte";
    import { readLogFiles } from "../../helpers";
    import { readDataByTypes } from "../../IndexedDB";
    import Dropdown from "../Dropdown.svelte";
    let openFile = true;
    let readLogPromise;//TODO: add multi file input 
    let dropdownOptions = readDataByTypes('searchProfiles').then(searchProfiles => searchProfiles.map(profile => ({id: profile.id, text: profile.name})));
    let selectedOption;
</script>

<div class="w-full p-4 flex justify-start items-center space-x-4">
    {#await dropdownOptions}
        <Dropdown options={[{id: 0, text: 'Loading...'}]} selectedOption="none">
            <p slot="label" class="h4 font-monospace">Select Search Profile to use: </p>
        </Dropdown>
    {:then options} 
        <Dropdown {options} bind:selectedOption={selectedOption}>
            <p slot="label" class="h4 font-monospace">Select Search Profile to use: </p>
        </Dropdown>
    {/await}
</div>
{#if openFile} 
    <FileInput onFileOpen={(files) => {
        readLogPromise = readLogFiles(files[0]);
        openFile = false;
    }}/>
{:else}
    {#await readLogPromise then logFile} 
        <div class="w-full flex justify-end p-1">
            <Button onClick={() => openFile = true}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </Button>
        </div>
        <TextView>
            
           <p>{logFile}</p> 
        </TextView>
    {/await}
{/if}
