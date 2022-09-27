<script lang="ts">
	import type { Line } from './logHelpers';
	import TextView from './TextView.svelte';
	import Liner from './Liner.svelte';
	import Button from '../Button.svelte';

	export let onExit: () => any | null = null;
	export let lines: Array<Line>;
	export let highlightedLine: Number = -1;
	export let highlightColor: string = 'yellow';
</script>

<div class="w-full flex justify-end">
	{#if onExit}
		<div class="absolute p-2 mr-3">
			<Button onClick={onExit}>
				<svg
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
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</Button>
		</div>
	{/if}
</div>
<div class="h-[80vh]">
	<TextView>
		{#each lines as { lineNum, text } (lineNum)}
			<Liner
				{text}
				id={`logline-${lineNum}`}
				highlight={highlightedLine == lineNum ? [0, null] : []}
				{highlightColor}
				lineNum={lineNum + ''}
				lineBreak
			/>
		{/each}
	</TextView>
</div>
