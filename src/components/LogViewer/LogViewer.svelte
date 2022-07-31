<script lang="ts">
    import TextArea from "../TextArea.svelte";
    import FileInput from '../compositions/FileInput.svelte';
    import { readLogFiles } from "../../helpers";
    let fileRead = false;
    let readLogPromise;//TODO: add multi file input 
</script>

{#if !fileRead} 
    <FileInput onFileOpen={(files) => {
        readLogPromise = readLogFiles(files[0]);
        fileRead = true;
    }}/>
{:else}
    {#await readLogPromise then logFile} 
        <TextArea text={logFile} wrap={false}/>
    {/await}
{/if}
