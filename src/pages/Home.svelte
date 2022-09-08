<script lang="ts">
	import Nav from '../components/compositions/Nav.svelte';
	import LogViewer from '../components/LogViewer/LogViewer.svelte';
	export let params;
	export let currentRoute;
	console.log('params ', params);
</script>

<Nav
	links={params.links}
	activeHref={currentRoute}
	logoLarge={params.logo}
	logoSmall={params.logo}
/>
<main>
	<div class="w-full p-4 pt-0 font-monospace">
		<LogViewer />
	</div>
</main>
