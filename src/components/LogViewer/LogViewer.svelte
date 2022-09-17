<script lang="ts">
	import TextView from './TextView.svelte';
	import FileInput from '../compositions/FileInput.svelte';
	import Button from '../Button.svelte';
	import Liner from './Liner.svelte';
	import Tabs from '../Tabs.svelte';
	import { parseBySearchProfile } from './logHelpers';
	import { readDataByTypes, SearchProfile } from '../../IndexedDB';
	import Dropdown from '../Dropdown.svelte';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';

	let openFile = true;
	let currentLogs;
	let parsedLogLines;
	let dropdownOptions = readDataByTypes('searchProfiles').then((searchProfiles) =>
		searchProfiles.map((profile) => ({ ...profile, text: profile.name }))
	);

	let selectedProfile: SearchProfile;
	let highlightedLine;
	let highlightColor = 'var(--secondary-0)';

	const goToLine = (lineNumber) => {
		highlightedLine = lineNumber;
		document
			.getElementById(`logline-${lineNumber}`)
			.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};
</script>

<div class="w-full p-4 flex justify-start items-center space-x-4 font-monospace">
	{#await dropdownOptions}
		<Dropdown options={[{ id: 0, text: 'Loading...' }]} selectedOption="none">
			<p slot="label">Select Search Profile to use:</p>
		</Dropdown>
	{:then options}
		<Dropdown {options} bind:selectedOption={selectedProfile}>
			<p slot="label">Select Search Profile to use:</p>
		</Dropdown>
	{/await}
	<Button
		onClick={() => {
			parsedLogLines = parseBySearchProfile(selectedProfile, currentLogs);
		}}
	>
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
				d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
			/>
		</svg>
	</Button>
</div>

{#if openFile}
	<div class="w-full h-[75vh]">
		<FileInput
			message="Open Your Logs"
			onFileOpen={(logs) => {
				currentLogs = logs;
				parsedLogLines = parseBySearchProfile(selectedProfile, logs);
				openFile = false;
			}}
			onError={() => toast.push('Failed to open file')}
		/>
	</div>
{:else}
	<div class="w-full flex justify-end">
		<div class="absolute p-2 mr-3">
			<Button onClick={() => (openFile = true)}>
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
	</div>
	<div class="h-[80vh]">
		<TextView>
			{#each parsedLogLines.lines as { lineNum, text } (lineNum)}
				<Liner
					{text}
					id={`logline-${lineNum}`}
					highlight={highlightedLine == lineNum ? [0, null] : []}
					{highlightColor}
					{lineNum}
					lineBreak
				/>
			{/each}
		</TextView>
	</div>
	<div class="p-2 rounded-lg bg-primary-0">
		<Tabs tabList={parsedLogLines.snippedLines.map((line) => line.snippet.name)}>
			<svelte:fragment let:currentTab>
				<div class="min-h-[50vh]">
					{#each parsedLogLines.snippedLines as { snippet, lines } (snippet.name)}
						{#if lines.length > 0 && currentTab == snippet.name}
							<div>
								<div class="h-[60vh]">
									<TextView>
										{#each lines as { text, lineNum, match } (lineNum)}
											<Liner
												{text}
												{lineNum}
												highlight={match}
												highlightColor={snippet.color}
												onClick={() => goToLine(lineNum)}
												lineBreak
											/>
										{/each}
									</TextView>
								</div>
								<p class="p-1 my-2 rounded bg-primary-dark-2 text-primary-1">
									<span class="font-bold text-secondary-1">Pattern: </span>"{snippet.pattern}"
								</p>
								<p class="rounded p-1 bg-primary-1 text-primary-dark-2">{snippet.message}</p>
							</div>
						{/if}
					{/each}
				</div>
			</svelte:fragment>
		</Tabs>
	</div>
{/if}

<SvelteToast />
