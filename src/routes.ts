import Layout from './layouts/Layout.svelte';
import Config from './pages/Config.svelte';
import Home from './pages/Home.svelte';
import Info from './pages/Info.svelte';
import Missing from './pages/Missing.svelte';

const routes = [
	{
		name: '/',
		component: Home,
		layout: Layout
	},
	{
		name: '/config',
		component: Config,
		layout: Layout
	},
	{
		name: '/info',
		component: Info,
		layout: Layout
	},
	{
		name: '404',
		path: '404',
		component: Missing,
		layout: Layout
	}
];

export { routes };
