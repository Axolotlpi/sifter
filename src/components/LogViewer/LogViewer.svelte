<script lang="ts">
	import { currentLogs, currentFiles, selectedProfile } from './logStores'
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
	let startingLine;
	let endingLine;
	let visableLogLines

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

	const trimLogs = async (start, end, logs) => {
		const res = logs.slice(start, end);
		visableLogLines = res;
		return res;
	};

	$: logLinesPromise =
		$currentLogs &&
		getLines($currentLogs).then((lines) => {
			logLines = lines;
			if(lines.length > maxLines) toast.push('Paginated to 10000 (large file)')
			setBounds(0, lines.length < maxLines ? lines.length : maxLines);
		});

	$: visableLogLinesPromise = logLines
		? trimLogs(startingLine, endingLine, logLines)
		: new Promise(() => {});

	$: parsedLogLinesPromise =
		$selectedProfile && visableLogLines
			? parseBySearchProfile($selectedProfile, visableLogLines)
			: new Promise(() => {});

	let dropdownOptions = readDataByTypes('searchProfiles').then((searchProfiles) =>
		searchProfiles.map((profile) => ({ ...profile, text: profile.name }))
	);


	$:highlightColor = $selectedProfile?.highlightColor;

	let highlightedLine;
	

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

<div
	class="w-full p-4 flex flex-col sm:flex-row justify-between items-center space-x-4 font-monospace"
>
	<div class="p-2 sm:p-0 flex justify-center items-center space-x-2">
		{#await dropdownOptions}
			<Dropdown options={[{ id: 0, text: 'Loading...' }]} selectedOption="none">
				<p slot="label">Select Search Profile to use:</p>
			</Dropdown>
		{:then options}
			<Dropdown {options} bind:selectedOption={$selectedProfile}>
				<p slot="label">Select Search Profile to use:</p>
			</Dropdown>
		{/await}
		{#if $currentFiles}
			<p class="p-2 bold rounded bg-secondary-1 opacity-80">{$currentFiles[0].name}</p>
		{/if}
	</div>
	<Paginator
		bind:start={startingLine}
		bind:end={endingLine}
		onNext={(start, end) => pageNext(start, end)}
		onPrevious={(start, end) => pagePrevious(start, end)}
		onEnter={(start, end) => setBounds(start, end)}
	/>
</div>

{#if !$currentFiles}
	<div class="w-full h-[75vh]">
		<FileInput
			bind:receivedFile={$currentFiles}
			message="Open Your Logs"
			onFileOpen={(logs) => {
				$currentLogs = logs;
			}}
			onError={() => $currentLogs = undefined && toast.push('Failed to open file')}
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
		{#if true}
			<div class="">
				<div class="overflow-clip resize-x">
					<LineArea
						lines={visableLogLines}
						onExit={() => ($currentFiles = false)}
						{highlightedLine}
						highlightColor={highlightColor}
					/>
				</div>
				<div class="overflow-scroll">
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
				</div>
			</div>
		{:else}

			<LineArea
				lines={visableLogLines}
				onExit={() => ($currentFiles = false)}
				{highlightedLine}
				highlightColor={highlightColor}
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

		{/if}
	{/await}
{/if}

<SvelteToast />
