<script lang="ts">
	import Modal from '../Modal.svelte';
	import Button from '../Button.svelte';

	export let onConfirm = async () => null;
	export let onCancel = async () => null;
	export let ok: boolean = false;
	export let cancel = false;
	export let trigger = false; //bindable
</script>

<Modal active={trigger}>
	<slot />
	<div slot="bottom" class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
		{#if cancel}
			<Button
				onClick={() => {
					onCancel();
					trigger = false;
				}}
			>
				Cancel
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</Button>
		{/if}
		{#if ok}
			<Button
				onClick={() => {
					onConfirm();
					trigger = false;
				}}
			>
				Ok
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
			</Button>
		{/if}
	</div>
</Modal>
