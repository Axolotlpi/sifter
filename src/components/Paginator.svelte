<script lang="ts">
	export let start: number;
	export let end: number;
	export let onNext: () => any;
	export let onPrevious: () => any;
	export let onEnter: (start: number, end: number) => any;

	$: startInput = start;
	$: endInput = end;
</script>

<div class="isolate inline-flex -space-x-px rounded-md shadow-sm">
	<button
		on:click={() => onPrevious()}
		class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
	>
		<span class="sr-only">Previous</span>
		<!-- Heroicon name: mini/chevron-left -->
		<svg
			class="h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<input
		bind:value={startInput}
		type="text"
		class="relative text-center w-12 border border-gray-300 bg-white  text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
	/>

	<input
		bind:value={endInput}
		type="text"
		class="relative text-center w-12 border border-gray-300 bg-white  text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
	/>

	<button
		on:click={() => onNext()}
		class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
	>
		<span class="sr-only">Next</span>
		<!-- Heroicon name: mini/chevron-right -->
		<svg
			class="h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>
	<div class="pl-1">
		<button
			on:click={() => onEnter(startInput, endInput)}
			class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
			><svg
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
					d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
				/>
			</svg>
		</button>
	</div>
</div>
