<script lang="ts">
    import { Block } from "$lib/classes/Block";

    let { block, prevHash = "0" }: { block: Block; prevHash?: string } =
        $props();

    let data = $state(block.getData());
    let isValidHash = $state(false);

    $effect(() => {
        if (prevHash) {
            block = new Block(
                prevHash,
                data,
                block.getNonce(),
                block.getDifficulty()
            );
        }
        // Check if the hash starts with the correct number of zeros
        isValidHash = block.getHash().substring(0, block.getDifficulty()) === Array(block.getDifficulty() + 1).join('0');
    });

    function updateData() {
        // Create a new block with the updated data
        block = new Block(
            prevHash,
            data,
            block.getNonce(),
            block.getDifficulty()
        );
    }

    function mineBlock() {
        block.mineBlock();
        block = new Block(
            prevHash,
            data,
            block.getNonce(),
            block.getDifficulty()
        );
    }
</script>

<div class="block-card" class:valid-block={isValidHash} class:invalid-block={!isValidHash}>
    <p>Previous Hash: {prevHash}</p>
    <div>
        <label for="blockData">Data:</label>
        <input id="blockData" oninput={updateData} bind:value={data} />
    </div>
    <p>Difficulty: {block.getDifficulty()}</p>
    <p>Nonce: {block.getNonce()}</p>
    <p class={isValidHash ? "valid-hash" : "invalid-hash"}>Hash: {block.getHash()}</p>
    <button onclick={mineBlock}>Mine</button>
</div>

<style>
    .block-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        border-radius: 8px;
        transition: background-color 0.3s ease;
    }
    
    .valid-block {
        background-color: rgba(76, 175, 80, 0.1); /* Light green background for valid blocks */
        border-color: #4CAF50;
    }
    
    .invalid-block {
        background-color: rgba(244, 67, 54, 0.1); /* Light red background for invalid blocks */
        border-color: #F44336;
    }
    
    .valid-hash {
        color: #4CAF50; /* Green color for valid hash */
    }
    
    .invalid-hash {
        color: #F44336; /* Red color for invalid hash */
    }
</style>
