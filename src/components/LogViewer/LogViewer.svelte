<script lang="ts">
	import FileInput from '../compositions/FileInput.svelte';
	import LineArea from './LineArea.svelte';
	import { parseBySearchProfile, getLines } from './logHelpers';
	import { readDataByTypes, SearchProfile } from '../../IndexedDB';
	import Dropdown from '../Dropdown.svelte';
	import { SvelteToast, toast } from '@zerodevx/svelte-toast';
	import ResultsTabs from './ResultsTabs.svelte';
	import Paginator from '../Paginator.svelte';

	const maxLines = 10000;

	let logLines;
	let openFile = true;
	let currentLogs;
	let startingLine = 0;
	$: endingLine = logLines && logLines.length < maxLines ? logLines.length : maxLines;
	$: visableLinesAmount = endingLine - startingLine;
	$: getLinesPromise =
		currentLogs &&
		getLines(currentLogs).then((lines) => {
			logLines = lines;
			return lines;
		});
	$: parsedLogLinesPromise =
		selectedProfile &&
		logLines &&
		parseBySearchProfile(selectedProfile, logLines.slice(startingLine, endingLine + 1));

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

	const pageNext = () => {
		const end = logLines.length - 1;
		if (endingLine >= end) return;
		endingLine = endingLine + visableLinesAmount < end ? endingLine + visableLinesAmount : end;
		startingLine += visableLinesAmount;
	};

	const pagePrevious = () => {
		if (startingLine >= 0) return;
		startingLine = startingLine - visableLinesAmount > 0 ? startingLine - visableLinesAmount : 0;
		endingLine -= visableLinesAmount;
	};
</script>

<div class="w-full p-4 flex justify-between items-center space-x-4 font-monospace">
	<div class="flex justify-center items-center space-x-2">
		{#await dropdownOptions}
			<Dropdown options={[{ id: 0, text: 'Loading...' }]} selectedOption="none">
				<p slot="label">Select Search Profile to use:</p>
			</Dropdown>
		{:then options}
			<Dropdown {options} bind:selectedOption={selectedProfile}>
				<p slot="label">Select Search Profile to use:</p>
			</Dropdown>
		{/await}
	</div>
	<Paginator
		bind:start={startingLine}
		bind:end={endingLine}
		onNext={() => pageNext()}
		onPrevious={() => pagePrevious()}
		onEnter={(start, end) => {
			startingLine = start;
			endingLine = end;
		}}
	/>
</div>

{#if openFile}
	<div class="w-full h-[75vh]">
		<FileInput
			message="Open Your Logs"
			onFileOpen={(logs) => {
				openFile = false;
				currentLogs = logs;
			}}
			onError={() => toast.push('Failed to open file')}
		/>
	</div>
{:else}
	{#await getLinesPromise}
		<div class="flex justify-center items-center">
			<div
				class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-secondary-dark-0 rounded-full"
				role="status"
			>
				<span class="hidden">Loading...</span>
			</div>
		</div>
	{:then parsedLines}
		<LineArea
			lines={parsedLines.slice(startingLine, endingLine + 1)}
			onExit={() => (openFile = true)}
			{highlightedLine}
			{highlightColor}
		/>
		{#await parsedLogLinesPromise}
			<div class="flex justify-center items-center">
				<div
					class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-secondary-dark-0 rounded-full"
					role="status"
				>
					<span class="hidden">Loading...</span>
				</div>
			</div>
		{:then parsedLogLines}
			<ResultsTabs parsedLines={parsedLogLines} onSelectResult={(lineNum) => goToLine(lineNum)} />
		{/await}
	{/await}
{/if}

<SvelteToast />
