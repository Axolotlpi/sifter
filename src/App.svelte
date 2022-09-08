<script lang="ts">
	import { Router } from 'svelte-router-spa';
	import { routes } from './routes.ts';
</script>

<main>
	<Router {routes} />
</main>
