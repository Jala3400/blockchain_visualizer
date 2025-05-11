<script lang="ts">
    import BlockCard from "$lib/components/molecules/BlockCard/BlockCard.svelte";
    import { Block } from "$lib/classes/Block";

    // Array to store block instances
    const block = new Block(
        "0000000000000000000000000000000000000000000000000000000000000000",
        "",
        2
    );
    let blocks: Block[] = [block];

    // Handle data changes in any block
    function handleDataChange(index: number) {
        // When a block changes, update all subsequent blocks
        for (let i = index + 1; i < blocks.length; i++) {
            const prevHash = blocks[i - 1].getHash();
            blocks[i].updatePrevHash(prevHash);
        }
    }
</script>

<div class="blockchain">
    {#each blocks as block, i}
        <div class="block-wrapper">
            <h3>Block #{i}</h3>
            <BlockCard
                {block}
                prevHash={i > 0 ? blocks[i - 1].getHash() : "0"}
                update={() => handleDataChange(i)}
            />
        </div>
    {/each}
</div>

<style>
    .blockchain {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        width: 100%;
        max-width: 660px;
    }

    .block-wrapper {
        width: 100%;
    }

    .block-wrapper h3 {
        text-align: center;
        margin-bottom: 10px;
    }
</style>
