<script lang="ts">
    import { Block } from "$lib/classes/Block";

    let { block, prevHash = "0" }: { block: Block; prevHash?: string } =
        $props();

    $effect(() => {
        if (prevHash) {
            block.setPrevHash(prevHash);
        }
    });
</script>

<div class="block-card">
    <p>Previous Hash: {prevHash}</p>
    <p>Timestamp: {block.getTimestamp()}</p>
    <p>Data: {block.getData()}</p>
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
