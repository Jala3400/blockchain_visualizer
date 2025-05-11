<script lang="ts">
    import { Block } from "$lib/classes/Block";
    import { BlockCardClass } from "./BlockCardClass.svelte.ts";

    let {
        block,
        prevHash = "0",
        update = () => {},
    }: { block: Block; prevHash?: string; update?: () => void } = $props();

    const blockCard = new BlockCardClass(block);
    let isValidHash = $derived(blockCard.getIsValidHash());

    $effect(() => {
        // Calls update when there is a change in the hash
        blockCard.getHash();
        update();
    });

    function updatePrevHash(newPrevHash: string) {
        blockCard.updatePrevHash(newPrevHash);
    }

    function updateData(newData: string) {
        blockCard.updateData(newData);
    }

    function updateDifficulty(newDifficulty: number) {
        blockCard.updateDifficulty(newDifficulty);
    }

    function updateNonce(newNonce: number) {
        blockCard.updateNonce(newNonce);
    }

    function mineBlock() {
        blockCard.mineBlock();
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
    <div>
        <label for="blockNonce">Nonce:</label>
        <input
            id="blockNonce"
            type="number"
            min="0"
            value={blockCard.getNonce()}
            oninput={(e) => updateNonce(parseInt(e.currentTarget?.value ?? ""))}
        />
    </div>
    <p class={isValidHash ? "valid-hash" : "invalid-hash"}>
        Hash: {blockCard.getHash()}
    </p>
    <button onclick={mineBlock}>Mine</button>
</div>

<style>
    .block-card {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 8px;
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
