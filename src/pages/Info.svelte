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
	<div class="w-full p-4 lg:px-8 pt-0 font-monospace">
		<h1>About Sifter</h1>
		<p>
			Sifter is a project of hate, like any other. Reading words is hard, reading a lot of them is
			really hard, but reading logs? We’ll I’m sure you know, it’s about as pleasant and swift a
			process as trying to write a peace treaty with the system that bled them in hopes of a
			ceasefire. Yes, Sifter is essentially an ambassador between you and your ill designed project.
			Ironically enough. it is. in itself. an ill designed project.
		</p>
		<h2 class="h3">Features:</h2>
		<ul>
			<li>
				Custom saved searches - search the same regex patterns over and over, and you get to define
				exactly what thesepatterns are
			</li>
			<li>
				No cloud dependance - all of your configuration is saved in json and in the browser. You can
				download it and save it and none of it is ever sent to any backend.
			</li>
			<li>
				Minimalistic Design - I just need some other point to make 3 points. But seriously, it’s not
				half bad
			</li>
		</ul>

		<p>
			You’ll notice two important sections so far with more to come: the searcher - where you do
			simple searching in bulk using predefined “profiles”, and the Configuration - where you’ll be
			able to create and save “search profiles” to use later in the searcher. These profiles are
			made of a few different properties and a list of “snippets”. These will contain the different
			“patterns” you want to match in the searcher. Along side the pattern, you can define a
			readable (and unique) name, an informational message as a note to yourself, and the color to
			use to highlight that particular match in the text.
		</p>
		<p>
			As you may notice, the configuration is currently set in plain JSON format. This means it’s
			very, very easy to break the application. Thus, we have some rules to follow in order to keep
			everything working smoothly. For this reason it is recommended to edit this config in a
			separate editor that can confirm the syntax for the time being. Aside from plain JSON syntax
			rules here are the guidelines when editing your configuration:
		</p>
		<ul>
			<li>
				id - this is an automatically generated unique identifier, and should never be modified
			</li>
			type - this is also automatic and defines the type of configuration and changing this should also
			be avoided
			<li>name - this is the name of the profile and up to the user. Recommended to be short.</li>
			<li>
				snippets - this is a list containing objects with the following format: (don’t forget to put
				commas between each object)
			</li>
			<li>name - short name to define the snippet, this will be shown for each snippet’s tab.</li>
			<li>
				pattern - this is the regex pattern used to match the text input. No flags are currently
				allowed.
			</li>
			<li>message - this is simply for user’s notes and is shown underneath the snippet results</li>
			<li>
				color - this is a css color value (eg. hex, rgb) used to highlight the search text, for
				recognizability.
			</li>
		</ul>
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
