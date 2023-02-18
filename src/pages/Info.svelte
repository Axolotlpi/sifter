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
<main>
	<div class="w-full p-4 lg:px-10 pt-0 font-monospace text-xl">
		<h1>About Sifter</h1>
		<p class="px-16">
			Sifter is a project of hate, like any other. Reading words is hard, reading a lot of them is
			really hard, but reading logs? We’ll I’m sure you know, it’s about as pleasant and swift a
			process as trying to write a peace treaty with the system that bled them in hopes of a
			ceasefire. Yes, Sifter is essentially an ambassador between you and your ill designed project.
			Ironically enough. it is. in itself. an ill designed project.
		</p>
		<h2 class="h3">Features:</h2>
		<ul class="m-4 p-2 rounded bg-secondary-dark-0 text-primary-0">
			<li>
				<span class="font-bold">Custom saved searches</span> - search the same regex patterns over and
				over, and you get to define exactly what these patterns are
			</li>
			<li>
				<span class="font-bold">No cloud dependance</span> - all of your configuration is saved in json
				and in the browser. You can download it and save it and none of it is ever sent to any backend.
			</li>
			<li>
				<span class="font-bold">Works completely offline</span> - yes, for the rare occacion that you
				need to read a log while disconnected from the internet.
			</li>
		</ul>

		<p class="px-16">
			You’ll notice two important sections so far with more to come: <br/> The <strong>Searcher</strong> - where you do
			simple searching in bulk using predefined “profiles”, and <br/>The <strong>Configuration</strong> - where you’ll be
			able to create and save “search profiles” to use later in the searcher. These profiles are
			made of a few different properties and a list of “snippets”. These will contain the different
			“patterns” you want to match in the searcher. Along side the pattern, you can define a
			readable (and unique) name, an informational message as a note to yourself, and the color to
			use to highlight that particular match in the text.
		</p>
		<p class="px-16">
			As you may notice, the configuration is essentially just a bunch of rules for you to define your
			search terms. You can also "download" your config to move it over to a different browser. Don't worry,
			the browser you make it in should save all your config locally so you don't have to worry about closing 
			your tabs. Below are the descriptions for the fields you'll see in the Search Profile config:
		</p>
		<div class="overflow-x-auto relative">
			<table class="w-full text-sm text-left text-primary-2">
				<thead class="text-xs text-primary-1 uppercase bg-gray-50 dark:bg-gray-700">
					<tr>
						<th scope="col" class="py-3 px-6"> Feild </th>
						<th scope="col" class="py-3 px-6"> Description </th>
					</tr>
				</thead>
				<tbody>
					<tr class="bg-primary-0 border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							id
						</th>
						<td class="py-4 px-6">
							this is an automatically generated unique identifier, and should never be modified
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							type
						</th>
						<td class="py-4 px-6">
							this is also automatic and defines the type of configuration and changing this should
							also be avoided
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							name
						</th>
						<td class="py-4 px-6">
							this is the name of the profile and up to the user. Recommended to be short.
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							highlightColor
						</th>
						<td class="py-4 px-6">
							this is the primary highlight color for the profile. It's used for the currently viewed line.
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="underline py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							snippets
						</th>
						<td class="py-4 px-6">
							this is a list containing objects with the following format.
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 pl-10 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							name
						</th>
						<td class="py-4 px-6">
							short name to define the snippet, this will be shown for each snippet’s tab.
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 pl-10 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							pattern
						</th>
						<td class="py-4 px-6">
							this is the regex pattern used to match the text input. No flags are currently
							allowed.
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 pl-10 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							message
						</th>
						<td class="py-4 px-6">
							this is simply for user’s notes and is shown underneath the snippet results
						</td>
					</tr>
					<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
						<th
							scope="row"
							class="py-4 px-6 pl-10 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							color
						</th>
						<td class="py-4 px-6">
							this is a css color value used to highlight the search text, for
							ease of viewing.
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</main>

<style>
	h1,
	h2 {
		margin-bottom: 0.5em;
	}

	p {
		text-indent: 0.5em;
		margin-bottom: 1em;
	}

	ul {
		margin-bottom: 1em;
	}
</style>
