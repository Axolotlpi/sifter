<script lang="ts">
	import { Route } from 'svelte-router-spa';
	import logo from '../assets/512x512.png';
	export let currentRoute;
	const params = {
		links: [
			{
				href: '/',
				text: 'Searcher'
			},
			{
				href: '/config',
				text: 'Configure'
			},
			{
				href: '/info',
				text: 'Info'
			}
		],
		logo: logo
	};
</script>

<div class="app">
	<Route {currentRoute} {params} />
</div>

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
