<script lang="ts">
	import { v4 as uuid } from 'uuid';
	type DropdownOption = {
		id: string | number;
		text: string;
	};
	export let options: Array<DropdownOption>;
	export let selectedOption; //bindable
	const selectId = uuid();
</script>

<label for={selectId}>
	<slot name="label" />
</label>
<select
	id={selectId}
	bind:value={selectedOption}
	class="h-min p-2 rounded text-primary-dark-2 hover:text-primary-dark-1 hover:bg-secondary-1"
>
	{#each options as option}
		<option value={option}>
			{option.text}
		</option>
	{/each}
</select>
