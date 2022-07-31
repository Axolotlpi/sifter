<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../Button.svelte'
	
	export let onFileOpen: (file:File) => any;
	let droppedFiles = null;
	let openedFiles = null;
	$: if (droppedFiles || openedFiles)  {
		onFileOpen(droppedFiles || openedFiles);
	}

	let inputElement;
	let dropbox;
	let drag = false;
	const dragOn = () => drag = true;
	const dragOff = () => drag = false;

	onMount(() => {
		dropbox.addEventListener("dragenter", (e) => {stopEvent(e); dragOn()} , false);
		dropbox.addEventListener("dragover", stopEvent, false);
		dropbox.addEventListener("dragleave", (e) => {stopEvent(e); dragOff()}, false);
		dropbox.addEventListener("dragend", (e) => {stopEvent(e); dragOff()}, false);
		dropbox.addEventListener("drop", (e) => {stopEvent(e); onDropFile(e)}, false);
	})

	const stopEvent = (e) => {
		e.stopPropagation();
		e.preventDefault();
	}
	const onDropFile = (e) => {
		const dt = e.dataTransfer;
  		droppedFiles = dt.files;	
	}
</script>

<div bind:this={dropbox} class="w-full h-full flex items-center justify-center border-dashed border-secondary-2 bg-primary-0 border-8 rounded-xl transition-opacity duration-300"
	class:dragging={drag}>
	<Button srText="file input button" onClick={() => inputElement?.click()}>
		<p slot="left">Open Your Logs</p>
		<svg slot="right" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
		  <path stroke-linecap="round" stroke-linejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
		</svg>
	</Button>
	<input type="file" bind:files={openedFiles} bind:this={inputElement} accept=".txt,.log,text/plain" style="display:none"/>
</div>

<style>
	.dragging {
		opacity: 0.7;
	}
</style>