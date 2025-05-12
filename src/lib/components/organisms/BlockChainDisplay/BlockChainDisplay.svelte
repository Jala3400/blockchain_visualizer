<script lang="ts">
    import BlockCard from "$lib/components/molecules/BlockCard/BlockCard.svelte";
    import { Block } from "$lib/classes/Block";

    // Create initial blocks
    const genesisBlock = new Block(
        "0000000000000000000000000000000000000000000000000000000000000000",
        "",
        2
    );

    // Create second block with previous hash from genesis block
    const secondBlock = new Block(genesisBlock.getHash(), "Second Block", 2);

    // Create third block with previous hash from second block
    const thirdBlock = new Block(secondBlock.getHash(), "Third Block", 2);

    // Initialize with 3 blocks
    let blocks: Block[] = $state([genesisBlock, secondBlock, thirdBlock]);

    // Handle data changes in any block
    function handleDataChange(index: number) {
        // When a block changes, update all subsequent blocks
        for (let i = index + 1; i < blocks.length; i++) {
            const prevHash = blocks[i - 1].getHash();
            blocks[i].updatePrevHash(prevHash);
        }
    }

    // Function to add a new block to the blockchain
    function addBlock() {
        const prevHash = blocks[blocks.length - 1].getHash();
        const newBlock = new Block(prevHash, "", 2);
        blocks = [...blocks, newBlock];
    }
</script>

<div class="blockchain">
    {#each blocks as block, i}
        <div class="block-wrapper">
            <h3>Block #{i + 1}</h3>
            <BlockCard
                {block}
                prevHash={i > 0 ? blocks[i - 1].getHash() : "0"}
                update={() => handleDataChange(i)}
            />
        </div>
    {/each}

    <div class="add-block-container">
        <button onclick={addBlock}>Add New Block</button>
    </div>
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

    .add-block-container {
        margin-top: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    button {
        padding: 8px 16px;
        font-size: 1rem;
    }
</style>
