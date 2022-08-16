<script lang="ts">
    export let tabList: Array<string>;
    export let currentTab: string = ""; //bindable
    currentTab = tabList[0];
</script>


<div>
    <div class="border-b border-primary-0 mb-1">
        <ul class="flex flex-wrap -mb-px" id="myTab" role="tablist">
            {#each tabList as tab}
                <li class="mr-2" role="presentation">
                    <button on:click={() => currentTab = tab} class="inline-block text-primary-dark-0 hover:text-primary-dark-2 hover:border-secondary-1 rounded-t-lg p-3 text-sm font-medium text-center border-transparent border-b-2" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected={currentTab == tab ? "true" : "false"}
                     class:active={tab == currentTab}>{tab}</button>
                </li>
            {/each}
        </ul>
    </div>
    <div id="myTabContent">
        <div class="p-1 rounded-lg" role="tabpanel">
            <slot currentTab={currentTab} />
        </div>
    </div>
</div>

<style>
    .active {
        color: var(--primary-dark-2);
        border-color: var(--secondary-2);
    }
</style>