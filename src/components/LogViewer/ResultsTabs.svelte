<script lang="ts">
	import { selectedProfile } from './logStores';
	import Tabs from '../Tabs.svelte';
	import TextView from './TextView.svelte';
	import Liner from './Liner.svelte';
	import type { Line, SnippedLine } from './logHelpers';
	import { onMount } from 'svelte/internal';

	export let parsedLines: { lines: Array<Line>; snippedLines: Array<SnippedLine> };
	export let onSelectResult: (lineNum: number) => any | null = null;

	let currentTab = parsedLines.snippedLines[0].snippet.name;
	$:currentLines = parsedLines.snippedLines.find((snip) => snip.snippet.name == currentTab).lines;

	let currentResult = 0;
	const selectResult = (index) => {
		currentResult = index;
		onSelectResult(currentLines[index].lineNum);
	}

	const selectNext = () => {
		if(currentResult < currentLines.length - 1)
			selectResult(++currentResult)
	}

	const selectPrevious = () => {
		if(currentResult > 0)
			selectResult(--currentResult)
	}

	let tabs;
	onMount(() => {
		tabs.addEventListener('keydown', event => {
			console.log(event.key)
			if(event.key == "Tab" && !event.getModifierState("Shift")){
				selectNext();
				event.stopPropagation();
			}
			else if(event.key == "Tab" && event.getModifierState("Shift")){
				selectPrevious();
				event.stopPropagation();
			}
		});
	});
</script>

<div bind:this={tabs} class="p-2 rounded-lg bg-primary-0">
	<Tabs bind:currentTab={currentTab} tabList={parsedLines.snippedLines.map((line) => line.snippet.name)}>
		<svelte:fragment let:currentTab>
			<div class="min-h-[50vh]">
				{#each parsedLines.snippedLines as { snippet, lines } (snippet.name)}
						{#if currentTab == snippet.name}	
							<div class="h-[60vh] flex flex-col">
								{#if lines.length > 0}
									<TextView>
										{#each lines as { text, lineNum, match }, index (lineNum)}
											<Liner
												{text}
												lineNum={lineNum + ''}
												highlight={match}
												highlightColor={index == currentResult ? $selectedProfile.highlightColor : snippet.color}
												onClick={() => selectResult(index)}
												lineBreak
											/>
										{/each}
									</TextView>
								{/if}
								{#if snippet.pattern}
									<p class="p-1 my-2 rounded bg-primary-dark-2 text-primary-1">
										<span class="font-bold text-secondary-1">Pattern: </span>"{snippet.pattern}"
									</p>
								{/if}
								{#if snippet.message}
									<p class="rounded p-1 bg-primary-1 text-primary-dark-2">{snippet.message}</p>
								{/if}
							</div>
						{/if}
				{/each}
			</div>
		</svelte:fragment>
	</Tabs>
</div>
