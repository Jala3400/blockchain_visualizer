<script>
    import BlockCard from "$lib/components/molecules/BlockCard/BlockCard.svelte";
    import { Block } from "$lib/classes/Block";

    let block = new Block("0", "Hello, world!");
</script>

<BlockCard {block} />
