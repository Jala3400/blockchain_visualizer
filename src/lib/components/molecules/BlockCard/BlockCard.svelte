<script lang="ts">
    import { Block } from "$lib/classes/Block";

    let {
        block = $bindable(),
        update = () => {},
    }: { block: Block; update?: () => void } = $props();

    let blockData = $derived(block.getData());
    let blockNonce = $derived(block.getNonce());
    let blockDifficulty = $derived(block.getDifficulty());
    let blockHash = $derived(block.getHash());
    let blockPrevHash = $derived(block.getPrevHash());
    let isValidHash = $derived(block.isValidHash());
    let isMining = $derived(block.isCurrentlyMining());

    // Set up mining callback
    $effect(() => {
        block.setMiningCallback((nonce, hash) => {
            blockNonce = nonce;
            blockHash = hash;
            isMining = true;
        });
    });

    function updateData(newData: string) {
        block.updateData(newData);
        update();
    }

    function updateDifficulty(newDifficulty: number) {
        block.updateDifficulty(newDifficulty);
        update();
    }

    function updateNonce(newNonce: number) {
        block.updateNonce(newNonce);
        update();
    }

    async function mineBlock() {
        isMining = true;
        await block.mineBlock();
        isMining = false;
        update();
    }
</script>

<div
    class="block-card"
    class:valid-block={isValidHash}
    class:invalid-block={!isValidHash}
    class:mining={isMining}
>
    <p class="hash-text">Prev Hash: {blockPrevHash}</p>
    <div>
        <label for="blockData">Data:</label>
        <input
            id="blockData"
            value={blockData}
            oninput={(e) => updateData(e.currentTarget?.value ?? "")}
            disabled={isMining}
        />
    </div>
    <div>
        <label for="blockDifficulty">Difficulty:</label>
        <input
            id="blockDifficulty"
            type="number"
            min="1"
            max="6"
            value={blockDifficulty}
            oninput={(e) =>
                updateDifficulty(parseInt(e.currentTarget?.value ?? ""))}
            disabled={isMining}
        />
    </div>
    <div>
        <label for="blockNonce">Nonce:</label>
        <input
            id="blockNonce"
            type="number"
            min="0"
            value={blockNonce}
            oninput={(e) => updateNonce(parseInt(e.currentTarget?.value ?? ""))}
            disabled={isMining}
        />
    </div>
    <p
        class="hash-text"
        class:valid-hash={isValidHash}
        class:invalid-hash={!isValidHash}
    >
        Hash: {blockHash}
    </p>
    <button onclick={mineBlock} disabled={isMining}>
        {isMining ? "Mining..." : "Mine"}
    </button>
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

    .hash-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
    }

    .valid-hash {
        color: #4caf50; /* Green color for valid hash */
    }

    .invalid-hash {
        color: #f44336; /* Red color for invalid hash */
    }

    .mining {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #cccccc;
    }
</style>
