<script lang="ts">
    import { Block } from "$lib/classes/Block";
    import { BlockCardClass } from "./BlockCardClass.svelte.ts";

    let { block, prevHash = "0" }: { block: Block; prevHash?: string } =
        $props();

    const blockCard = new BlockCardClass(block);
    let isValidHash = $state(
        blockCard.getHash().substring(0, blockCard.getDifficulty()) ===
            Array(blockCard.getDifficulty() + 1).join("0")
    );

    function updatePrevHash(newPrevHash: string) {
        blockCard.updatePrevHash(newPrevHash);
        checkValidHash();
    }

    function updateData(newData: string) {
        blockCard.updateData(newData);
        checkValidHash();
    }

    function updateDifficulty(newDifficulty: number) {
        blockCard.updateDifficulty(newDifficulty);
        checkValidHash();
    }

    function checkValidHash() {
        // Check if the hash starts with the correct number of zeros
        isValidHash =
            blockCard.getHash().substring(0, blockCard.getDifficulty()) ===
            Array(blockCard.getDifficulty() + 1).join("0");
    }

    function mineBlock() {
        blockCard.mineBlock();
        checkValidHash();
    }

    // Initial setup
    updatePrevHash(prevHash);
</script>

<div
    class="block-card"
    class:valid-block={isValidHash}
    class:invalid-block={!isValidHash}
>
    <p>Previous Hash: {prevHash}</p>
    <div>
        <label for="blockData">Data:</label>
        <input
            id="blockData"
            value={blockCard.getData()}
            oninput={(e) => updateData(e.currentTarget?.value ?? "")}
        />
    </div>
    <div>
        <label for="blockDifficulty">Difficulty:</label>
        <input
            id="blockDifficulty"
            type="number"
            min="1"
            max="6"
            value={blockCard.getDifficulty()}
            oninput={(e) =>
                updateDifficulty(parseInt(e.currentTarget?.value ?? ""))}
        />
    </div>
    <p>Nonce: {blockCard.getNonce()}</p>
    <p class={isValidHash ? "valid-hash" : "invalid-hash"}>
        Hash: {blockCard.getHash()}
    </p>
    <button onclick={mineBlock}>Mine</button>
</div>

<style>
    .block-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        border-radius: 8px;
        transition: background-color 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .valid-block {
        background-color: rgba(
            76,
            175,
            80,
            0.1
        ); /* Light green background for valid blocks */
        border-color: #4caf50;
    }

    .invalid-block {
        background-color: rgba(
            244,
            67,
            54,
            0.1
        ); /* Light red background for invalid blocks */
        border-color: #f44336;
    }

    .valid-hash {
        color: #4caf50; /* Green color for valid hash */
    }

    .invalid-hash {
        color: #f44336; /* Red color for invalid hash */
    }
</style>
