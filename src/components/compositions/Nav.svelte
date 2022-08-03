<script lang="ts">
    import Button from '../Button.svelte';
    import Logo from '../Logo.svelte';
    import HorizontalBar from '../HorizontalBar.svelte';
    import VerticalBar from '../VerticalBar.svelte';
    export let links;
    export let activeHref;
    export let logoLarge;
    export let logoSmall;

    let mobileMenuToggled = false;
</script>

<header class="relative font-monospace">
  <nav class="bg-primary-0">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <Button bind:toggledState={mobileMenuToggled}>
            <span class="sr-only">Open main menu</span>
            <!--Heroicon name: outline/menu -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"
              class:hidden={mobileMenuToggled}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Heroicon name: outline/x -->
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"
              class:hidden={!mobileMenuToggled}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <!-- Left -->
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <Logo smallSrc={logoSmall} largeSrc={logoLarge} alt="logo" />
          </div>
          <div class="hidden sm:block sm:ml-6">
            <HorizontalBar {links} {activeHref} />
          </div>
        </div>
        <!-- Right -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on mobileMenuToggled state. -->
    <div class="sm:hidden" id="mobile-menu"
    class:hidden={!mobileMenuToggled}>
      <VerticalBar {links} {activeHref} /> 
    </div>
  </nav>

</header>
