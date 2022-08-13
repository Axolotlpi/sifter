<script lang="ts">
    import TextView from "./TextView.svelte";
    import FileInput from '../compositions/FileInput.svelte';
    import Button from "../Button.svelte";
    import Liner from "./Liner.svelte";
    import { parseBySearchProfile, readLogFiles } from "./logHelpers";
    import { readDataByTypes } from "../../IndexedDB";
    import Dropdown from "../Dropdown.svelte";
    let openFile = true;
    let currentFile;
    let readLogPromise;//TODO: add multi file input 
    const setReadLogPromise = () => {
        readLogPromise = readLogFiles(currentFile).then(logs => parseBySearchProfile(selectedProfile, logs));
    }
    let dropdownOptions = readDataByTypes('searchProfiles').then(searchProfiles => searchProfiles.map(profile => ({...profile, text: profile.name})));
    let selectedProfile;
    let highlightedLine;
    let highlightColor = "var(--secondary-0)";
    const goToLine = (lineNumber) => {
        highlightedLine = lineNumber;
        document.getElementById(`logline-${lineNumber}`).scrollIntoView({ behavior: 'smooth', block: 'center'});
    }
</script>

<div class="w-full p-4 flex justify-start items-center space-x-4">
    {#await dropdownOptions}
        <Dropdown options={[{id: 0, text: 'Loading...'}]} selectedOption="none">
            <p slot="label" class="p font-monospace">Select Search Profile to use: </p>
        </Dropdown>
    {:then options} 
        <Dropdown {options} bind:selectedOption={selectedProfile}>
            <p slot="label" class="p font-monospace">Select Search Profile to use: </p>
        </Dropdown>
    {/await}
    <Button onClick={setReadLogPromise}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    </Button>
</div>

{#if openFile} 
    <FileInput onFileOpen={(files) => {
        currentFile = files[0];
        setReadLogPromise();
        openFile = false;
    }}/>
{:else}
    {#await readLogPromise then logLines} 
        <div class="w-full flex justify-end p-1">
            <Button onClick={() => openFile = true}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </Button>
        </div>
        <TextView>
            {#each logLines.lines as {lineNum, text} (lineNum)}
                <Liner text={text} id={`logline-${lineNum}`} highlight={highlightedLine == lineNum ? [0, null] : []} highlightColor={highlightColor} {lineNum} lineBreak />
            {/each}
        </TextView>
        {#each logLines.snippedLines as {snippet, lines} (snippet.pattern)}
            <div class="py-4 min-h-max">
            {#if lines.length > 0}
                <TextView>
                    {#each lines as {text, lineNum, match} (lineNum)}
                        <Liner text={text} {lineNum} highlight={match} highlightColor={snippet.color} onClick={() => goToLine(lineNum)} lineBreak/>
                    {/each}
                </TextView>
            {/if}
            </div>
        {/each}
    {/await}
{/if}
