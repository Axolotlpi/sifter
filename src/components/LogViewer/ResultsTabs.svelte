<script lang="ts">
	import Tabs from '../Tabs.svelte';
	import TextView from './TextView.svelte';
	import Liner from './Liner.svelte';
	import type { Line, SnippedLine } from './logHelpers';

	export let parsedLines: { lines: Array<Line>; snippedLines: Array<SnippedLine> };
	export let onSelectResult: (lineNum: number) => any | null = null;
</script>

<div class="p-2 rounded-lg bg-primary-0">
	<Tabs tabList={parsedLines.snippedLines.map((line) => line.snippet.name)}>
		<svelte:fragment let:currentTab>
			<div class="min-h-[50vh]">
				{#each parsedLines.snippedLines as { snippet, lines } (snippet.name)}
					{#if lines.length > 0 && currentTab == snippet.name}
						<div>
							<div class="h-[60vh]">
								<TextView>
									{#each lines as { text, lineNum, match } (lineNum)}
										<Liner
											{text}
											lineNum={lineNum + ''}
											highlight={match}
											highlightColor={snippet.color}
											onClick={() => onSelectResult(lineNum)}
											lineBreak
										/>
									{/each}
								</TextView>
							</div>
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
