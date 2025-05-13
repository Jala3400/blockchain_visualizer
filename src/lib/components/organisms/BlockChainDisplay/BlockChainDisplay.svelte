<script lang="ts">
    import BlockCard from "$lib/components/molecules/BlockCard/BlockCard.svelte";
    import { Block } from "$lib/classes/Block";

    // Create initial blocks
    const genesisBlock = new Block(
        "0000000000000000000000000000000000000000000000000000000000000000",
        ""
    );

    // Create second block with previous hash from genesis block
    const secondBlock = new Block(genesisBlock.getHash(), "Second Block");

    // Create third block with previous hash from second block
    const thirdBlock = new Block(secondBlock.getHash(), "Third Block");

    // Initialize with 3 blocks
    let blocks: Block[] = $state([genesisBlock, secondBlock, thirdBlock]);

    // Handle data changes in any block
    function handleDataChange(index: number) {
        for (let i = index; i < blocks.length - 1; i++) {
            const prevHash = blocks[i].getHash();
            blocks[i + 1].updatePrevHash(prevHash);
        }
        blocks = [...blocks];
    }

    // Function to add a new block to the blockchain
    function addBlock() {
        const prevHash = blocks[blocks.length - 1].getHash();
        const newBlock = new Block(prevHash, "");
        blocks.push(newBlock);
    }

    // Function to mine all blocks in the blockchain
    async function mineAllBlocks() {
        for (let i = 0; i < blocks.length - 1; i++) {
            await blocks[i].mineBlock();
            blocks[i + 1].updatePrevHash(blocks[i].getHash());
        }
        await blocks[blocks.length - 1].mineBlock();
        blocks = [...blocks];
    }
</script>

<div class="blockchain">
    {#each blocks as _, i}
        <div class="block-wrapper">
            <h3>Block #{i + 1}</h3>
            <BlockCard
                bind:block={blocks[i]}
                update={() => handleDataChange(i)}
            />
        </div>
    {/each}

    <div class="add-block-container">
        <button onclick={addBlock}>Add New Block</button>
        <button onclick={mineAllBlocks}>Mine All Blocks</button>
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
        gap: 10px;
    }

    button {
        padding: 8px 16px;
        font-size: 1rem;
    }
</style>
