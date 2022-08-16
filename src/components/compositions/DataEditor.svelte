<script lang="ts">
    import { onMount } from "svelte";
    import { deleteFromDB, generateNewTemplate, readDataByTypes, writeToDB } from "../../IndexedDB";
    import Button from "../Button.svelte";
    import Modal from "../Modal.svelte";
    import TextArea from "../TextArea.svelte";
    export let dataType: string;

    let readDataPromise;

    onMount(() => {
        readDataPromise = readDataByTypes(dataType);
    });

    let editedDataText;
    let modalActive = false;
    const openEditModal = (data) => {
        editedDataText = JSON.stringify(data, null, '  ');
        modalActive = true;
    }

    const createNewData = async () => {
        openEditModal(generateNewTemplate(dataType));
        readDataPromise = readDataByTypes(dataType);
    }

    const saveData = async (data) => {
        await writeToDB(data);
        readDataPromise = readDataByTypes(dataType);
        modalActive = false;
    }

    const deleteData = async (data) => {
        await deleteFromDB(data);
        readDataPromise = readDataByTypes(dataType);
        modalActive = false;
    }

</script>

{#await readDataPromise then dataList}
    <div class="p-4 flex flex-wrap rounded-lg bg-primary-2 space-x-4">
        {#if dataList}
            {#each dataList as data (data.id)}
                <Button  onClick={() => openEditModal(data)}>{data.name}</Button>
            {/each}
        {/if}
    </div>
{/await}

<div class="mt-4 w-full flex justify-center">
    <Button onClick={createNewData}>Create New</Button>
</div>

<Modal active={modalActive}>
    <!-- forced height style, due to unknown bug where tailind only applies certain vh sizes -->
    <div class="w-full" style="height: 70vh">
        <TextArea bind:text={editedDataText} />
    </div>
    <div slot="bottom" class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <Button onClick={() => deleteData(JSON.parse(editedDataText))}>Delete</Button>
        <Button onClick={() => modalActive = !modalActive}>Cancel</Button>
        <Button onClick={() => saveData(JSON.parse(editedDataText))}>Save</Button>
    </div>
</Modal>