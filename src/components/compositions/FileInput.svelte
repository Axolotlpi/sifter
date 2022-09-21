<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../Button.svelte';
	import { readAsText } from 'promise-file-reader';

	export let onFileOpen: (text: string) => any;
	export let fileReceived = false;
	export let onError: (error: string) => any = () => null;
	export let message: string = 'Open';

	const readFile = async function (file: File) {
		try {
			return await readAsText(file);
		} catch (error) {
			onError(error);
		}
	};

	let droppedFiles = null;
	let openedFiles = null;
	let fileOpenPromise;

	$: if (droppedFiles || openedFiles) {
		const file = droppedFiles || openedFiles;
		fileReceived = true;
		fileOpenPromise = readFile(file[0]).then((text) => onFileOpen(text));
	}

	let inputElement;
	let dropbox;
	let drag = false;
	const dragOn = () => (drag = true);
	const dragOff = () => (drag = false);

	onMount(() => {
		dropbox.addEventListener(
			'dragenter',
			(e) => {
				stopEvent(e);
				dragOn();
			},
			false
		);
		dropbox.addEventListener('dragover', stopEvent, false);
		dropbox.addEventListener(
			'dragleave',
			(e) => {
				stopEvent(e);
				dragOff();
			},
			false
		);
		dropbox.addEventListener(
			'dragend',
			(e) => {
				stopEvent(e);
				dragOff();
			},
			false
		);
		dropbox.addEventListener(
			'drop',
			(e) => {
				stopEvent(e);
				onDropFile(e);
			},
			false
		);
	});

	const stopEvent = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const onDropFile = (e) => {
		const dt = e.dataTransfer;
		droppedFiles = dt.files;
	};
</script>

<div
	bind:this={dropbox}
	class="w-full h-full flex items-center justify-center border-dashed border-secondary-2 bg-primary-0 border-8 rounded-xl transition-opacity duration-300"
	class:dragging={drag}
>
	{#if !fileReceived}
		<Button srText="file input button" onClick={() => inputElement?.click()}>
			<p slot="left">{message}</p>
			<svg
				slot="right"
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
				/>
			</svg>
		</Button>
		<input
			type="file"
			bind:files={openedFiles}
			bind:this={inputElement}
			accept=".txt,.log,.json,text/plain"
			style="display:none"
		/>
	{:else}
		{#await fileOpenPromise}
			<div class="flex justify-center items-center">
				<div
					class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-secondary-dark-0 rounded-full"
					role="status"
				>
					<span class="hidden">Loading...</span>
				</div>
			</div>
		{:then file}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
				/>
			</svg>
		{/await}
	{/if}
</div>

<style>
	.dragging {
		opacity: 0.7;
	}
</style>
