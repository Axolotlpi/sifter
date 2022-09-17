<script lang="ts">
	import { onMount } from 'svelte';
	import { deleteFromDB, generateNewTemplate, readDataByTypes, writeToDB } from '../../IndexedDB';
	import { downloadText } from './editorHelpers';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import Button from '../Button.svelte';
	import Modal from '../Modal.svelte';
	import TextArea from '../TextArea.svelte';
	import ConfirmationModal from '../compositions/ConfirmationModal.svelte';
	import FileInput from '../compositions/FileInput.svelte';
	export let dataType: string;

	let readDataPromise;
	let uploadDataModal = false;

	onMount(() => {
		readDataPromise = readDataByTypes(dataType);
	});

	let editedDataText;
	let modalActive = false;
	const openEditModal = (data) => {
		editedDataText = JSON.stringify(data, null, '  ');
		modalActive = true;
	};

	const createNewData = async () => {
		openEditModal(generateNewTemplate(dataType));
		readDataPromise = readDataByTypes(dataType);
	};

	const saveData = async (data) => {
		await writeToDB(data);
		readDataPromise = readDataByTypes(dataType);
		modalActive = false;
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
	<div class="w-[80vw] h-[70vh]">
		<TextArea bind:text={editedDataText} />
	</div>
	<div slot="bottom" class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
		<Button onClick={() => deleteData(tryParseJSON(editedDataText))}>Delete</Button>
		<Button onClick={() => (modalActive = !modalActive)}>Cancel</Button>
		<Button onClick={() => saveData(tryParseJSON(editedDataText))}>Save</Button>
	</div>
</Modal>

<ConfirmationModal
	bind:trigger={uploadDataModal}
	cancel
	ok
	onConfirm={() => uploadedText && uploadData(uploadedText)}
>
	<div class="w-[60vw] h-[50vh]">
		<FileInput
			onFileOpen={(text) => {
				uploadedText = text;
			}}
		/>
	</div>
</ConfirmationModal>

<SvelteToast />
