<script lang="ts">
	import { onMount } from 'svelte';
	import { deleteFromDB, generateNewTemplate, readDataByTypes, writeToDB } from '../../IndexedDB';
	import { downloadText } from './editorHelpers';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import Button from '../Button.svelte';
	import Modal from '../Modal.svelte';
	import FlatObjectEditor from './FlatObjectEditor.svelte';
	import ConfirmationModal from '../compositions/ConfirmationModal.svelte';
	import FileInput from '../compositions/FileInput.svelte';
	export let dataType: string;
	export let schema: any;
	export let validate;

	let readDataPromise;
	let uploadDataModal = false;

	onMount(() => {
		readDataPromise = readDataByTypes(dataType);
	});

	let editedData;
	let modalActive = false;


	const openEditModal = (data) => {
		editedData = data;
		modalActive = true;
	};

	const createNewData = async () => {
		openEditModal(generateNewTemplate(dataType));
		readDataPromise = readDataByTypes(dataType);
	};

	const saveData = async (data) => {
		try {
			validate(data);
			await writeToDB(data);
			readDataPromise = readDataByTypes(dataType);
			modalActive = false;
		} catch (error) {
			toast.push(error.message);
		}
	};

	const deleteData = async (data) => {
		await deleteFromDB(data);
		readDataPromise = readDataByTypes(dataType);
		modalActive = false;
	};

	const downloadData = async () => {
		let data = await readDataByTypes(dataType);
		downloadText(`${dataType}.json`, JSON.stringify(data));
	};

	const refreshData = async () => {
		readDataPromise = readDataByTypes(dataType);
	};
	
	let uploadedText;
	const uploadData = async (text: string) => {
		const oldData = await readDataByTypes(dataType);
		let newData = tryParseJSON(text);
		await deleteFromDB(oldData);
		await writeToDB(newData);
		readDataPromise = readDataByTypes(dataType);
	};

	const tryParseJSON = (text: string) => {
		try {
			return JSON.parse(text);
		} catch (error) {
			toast.push('Error parsing JSON');
		}
	};
</script>

{#await readDataPromise then dataList}
	<div class="p-4 flex flex-wrap rounded-lg bg-primary-2 space-x-4">
		{#if dataList}
			{#each dataList as data (data.id)}
				<Button onClick={() => openEditModal(data)}>{data.name}</Button>
			{/each}
		{/if}
	</div>
{/await}

<div class="mt-4 w-full flex justify-center">
	<div class="p-1 bg-primary-2 rounded-l-md">
		<Button onClick={downloadData}>Download</Button>
		<Button onClick={() => (uploadDataModal = true)}>Upload</Button>
	</div>
	<div class="p-1 bg-secondary-1 rounded-r-md">
		<Button onClick={createNewData}>Create New</Button>
	</div>
</div>

<Modal active={modalActive}>
	<div class="w-[80vw] h-[70vh] overflow-scroll pr-2">
		<FlatObjectEditor {schema} bind:editedObject={editedData}/>
	</div>
	<div slot="bottom" class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
		<Button onClick={() => deleteData(editedData)}>Delete</Button>
		<Button onClick={() => {refreshData(); modalActive = false}}>Cancel</Button>
		<Button onClick={() => saveData(editedData)}>Save</Button>
	</div>
</Modal>

<ConfirmationModal
	bind:trigger={uploadDataModal}
	cancel
	ok
	onConfirm={() => uploadedText && uploadData(uploadedText)}
>
	<div class="w-full h-[50vh] flex flex-col items-center">
		<FileInput
			onFileOpen={(text) => {
				uploadedText = text;
			}}
		/>
		<p class="text-accent-1-3 rounded bg-primary-1 mt-4 p-1 max-w-2xl">
			<span class="font-bold">Warning:</span> uploading new config will erase your current config.
		</p>
	</div>
</ConfirmationModal>

<SvelteToast />
