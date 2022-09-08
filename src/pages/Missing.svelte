<script lang="ts">
	import Nav from '../components/compositions/Nav.svelte';
	export let params;
	export let currentRoute;
</script>

<Nav
	links={params.links}
	activeHref={currentRoute}
	logoLarge={params.logo}
	logoSmall={params.logo}
/>
<main class="w-full p-6 flex justify-center items-center">
	<h3 class="w-3/4 font-monospace bold">
		This is our 404 page. You probably didn't mean to come here, but we welcome you with open arms.
		:)
	</h3>
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
