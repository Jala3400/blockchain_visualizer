<script lang="ts">
    import { Block } from "$lib/classes/Block";

    let { block, prevHash = "0" }: { block: Block; prevHash?: string } =
        $props();

    let data = $state(block.getData());

    $effect(() => {
        if (prevHash) {
            block = new Block(prevHash, data, block.getDifficulty());
        }
    });

    function updateData() {
        // Create a new block with the updated data
        block = new Block(prevHash, data, block.getDifficulty());
    }
</script>

<div class="block-card">
    <p>Previous Hash: {prevHash}</p>
    <div>
        <label for="blockData">Data:</label>
        <input id="blockData" oninput={updateData} bind:value={data} />
    </div>
    <p>Difficulty: {block.getDifficulty()}</p>
    <p>Nonce: {block.getNonce()}</p>
    <p>Hash: {block.getHash()}</p>
</div>

<style>
    .block-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
    }
</style>
