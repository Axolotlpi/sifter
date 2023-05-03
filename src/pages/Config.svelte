<script lang="ts">
	import { get } from 'svelte/store';
	import Nav from '../components/compositions/Nav.svelte';
	import DataEditor from '../components/DataEditor/DataEditor.svelte';
	export let params;
	export let currentRoute;

	const schema = {
		id: 'immutable',
		type: 'immutable',
		name: 'string',
		highlightColor: 'color',
		snippets: [
			{
			name: 'string',
			pattern: 'string',
			message: 'string',
			color: 'color'
			}
		]
	}

	const validateSearchProfileData = (data) => {
		if(areDuplicates(getSnippetsNames(data.snippets)))
			throw new Error("Snippet names should be unique");
		return true;
	}
	const getSnippetsNames = (snippets) => {
		return snippets.map(snippet => snippet.name)
	}
	const areDuplicates = (list) => {
		const dups = list.filter((item, index) => list.indexOf(item) !== index);
		return (dups.length >= 1);
	}
</script>

<Nav
	links={params.links}
	activeHref={currentRoute}
	logoLarge={params.logo}
	logoSmall={params.logo}
/>
<main>
	<div class="w-full p-4 pt-0 font-monospace">
		<h2 class="p-4">Edit Your Configuration:</h2>
		<hr />
		<h3 class="p-4">Search Profiles:</h3>
		<DataEditor dataType="searchProfile" {schema} validate={validateSearchProfileData}/>
	</div>
</main>

<style>
	:root {
		scrollbar-color: var(--secondary-dark-0) var(--secondary-1);
		scrollbar-width: auto;
	}
	:root::-webkit-scrollbar {
		width: 16px;
		height: 16px;
	}
	:root::-webkit-scrollbar-track {
		background: var(--secondary-1);
	}
	:root::-webkit-scrollbar-thumb {
		background: var(--secondary-dark-0);
	}
</style>
