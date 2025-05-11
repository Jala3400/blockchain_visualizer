<script>
    import BlockChainDisplay from "$lib/components/organisms/BlockChainDisplay/BlockChainDisplay.svelte";
</script>

<div class="blockchain-container">
    <h1>Blockchain Demo</h1>
    <BlockChainDisplay />
</div>

<style>
    .blockchain-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        margin-bottom: 20px;
    }
</style>
