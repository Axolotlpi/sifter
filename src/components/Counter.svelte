<script lang="ts">
    let count = 0;
</script>

<h2>Count: {count}</h2>
<button on:click={() => count++}>+</button>
<button on:click={() => count--}>-</button>

<style>
    button {
        margin: 0.5em;
        border: 2px solid orangered;
        font-weight: bold;
        font-size: large;
        padding: 0.75em;
    }
</style>