<script lang="ts">
	export let active: boolean;
</script>

{#if active}
	<div class="relative z-10" aria-labelledby="edit modal" aria-modal="true">
		<div
			class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-200 opacity-0"
			class:opacity-full={active}
		/>

		<div class="fixed z-10 inset-0 overflow-y-auto">
			<div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
				<div
					class="relative bg-primary-0 rounded-lg text-left shadow-xl transform transition-all sm:my-8 ease-in-out duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					class:come-in={active}
				>
					<div class="bg-primary-0 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<slot />
						</div>
					</div>
					<div class="bg-primary-1">
						<slot name="bottom" />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.opacity-full {
		opacity: 1;
	}
	.come-in {
		opacity: 1;
		transform: translate3d(0, 0, 0);
		transform: scale3d(1, 1, 1);
	}
</style>
