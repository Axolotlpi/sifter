<script>
    export let smallSrc;
    export let largeSrc;
    export let alt;
</script>

<img class="block lg:hidden h-8 w-auto" src={smallSrc} alt={alt}>
<img class="hidden lg:block h-8 w-auto" src={largeSrc} alt={alt}>