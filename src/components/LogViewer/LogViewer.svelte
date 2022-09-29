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
	let startingLine;
	let endingLine;
	let visableLogLines;

	const setBounds = (start, end) => {
		const max = logLines?.length ? logLines.length : maxLines;
		startingLine = start > 0 ? start : 0;
		endingLine = end < max ? end : max;
	};
	const shiftBounds = (shift) => {
		if (endingLine + shift > logLines.length) {
			if (endingLine == logLines.length) return;
			setBounds(startingLine + shift, logLines.length);
		} else if (startingLine + shift < 0) {
			if (startingLine == 0) return;
			setBounds(0, endingLine + shift);
		} else {
			setBounds(startingLine + shift, endingLine + shift);
		}
	};

	$: {
		currentLogs &&
			getLines(currentLogs).then((lines) => {
				logLines = lines;
				if (openFile) {
					setBounds(0, lines.length < maxLines ? lines.length : maxLines);
					openFile = false;
				}
			});
	}

	const trimLogs = async (start, end, logs) => {
		const res = logs.slice(start, end);
		visableLogLines = res;
		return res;
	};

	$: visableLogLinesPromise = trimLogs(startingLine, endingLine, logLines);

	$: parsedLogLinesPromise =
		selectedProfile && visableLogLines && parseBySearchProfile(selectedProfile, visableLogLines);

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

	const pageNext = (start, end) => {
		setBounds(start, end);
		shiftBounds(end - start);
	};

	const pagePrevious = (start, end) => {
		setBounds(start, end);
		shiftBounds(start - end);
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
		onNext={(start, end) => pageNext(start, end)}
		onPrevious={(start, end) => pagePrevious(start, end)}
		onEnter={(start, end) => setBounds(start, end)}
	/>
</div>
{@debug endingLine}
{@debug startingLine}
{#if openFile}
	<div class="w-full h-[75vh]">
		<FileInput
			message="Open Your Logs"
			onFileOpen={(logs) => {
				currentLogs = logs;
			}}
			onError={() => toast.push('Failed to open file')}
		/>
	</div>
{:else}
	{#await visableLogLinesPromise}
		<div class="flex justify-center items-center">
			<div
				class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-secondary-dark-0 rounded-full z-40"
				role="status"
			>
				<span class="hidden">Loading...</span>
			</div>
		</div>
	{:then visableLogLines}
		<LineArea
			lines={visableLogLines}
			onExit={() => (openFile = true)}
			{highlightedLine}
			{highlightColor}
		/>
		{#await parsedLogLinesPromise}
			<div class="flex justify-center items-center">
				<div
					class="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-secondary-dark-0 rounded-full z-40"
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
