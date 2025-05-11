import { Block } from "$lib/classes/Block";

export class BlockCardClass {
    private block = new Block("", "", 0, 2);
    private prevHash = $state(this.block.getPrevHash());
    private data = $state(this.block.getData());
    private nonce = $state(this.block.getNonce());
    private difficulty = $state(this.block.getDifficulty());
    private hash = $state(this.block.getHash());
    private isValidHash = $state(this.checkValidHash());

    constructor(block: Block) {
        this.block = block;
        this.prevHash = block.getPrevHash();
        this.data = block.getData();
        this.nonce = block.getNonce();
        this.difficulty = block.getDifficulty();
        this.hash = block.getHash();
        this.isValidHash = this.checkValidHash();
    }

    private checkValidHash(): boolean {
        return this.hash.substring(0, this.difficulty) === Array(this.difficulty + 1).join("0");
    }

    public getIsValidHash(): boolean {
        return this.isValidHash;
    }

    public getPrevHash(): string {
        return this.prevHash;
    }

    public getData(): string {
        return this.data;
    }

    public getNonce(): number {
        return this.nonce;
    }

    public getDifficulty(): number {
        return this.difficulty;
    }

    public getHash(): string {
        return this.hash;
    }

    public updatePrevHash(newPrevHash: string): void {
        this.prevHash = newPrevHash;
        this.block.updatePrevHash(newPrevHash);
        this.hash = this.block.getHash();
        this.isValidHash = this.checkValidHash();
    }

    public updateData(newData: string): void {
        this.data = newData;
        this.block.updateData(newData);
        this.hash = this.block.getHash();
        this.isValidHash = this.checkValidHash();
    }

    public updateDifficulty(newDifficulty: number): void {
        this.difficulty = newDifficulty;
        this.block.updateDifficulty(newDifficulty);
        this.hash = this.block.getHash();
        this.isValidHash = this.checkValidHash();
    }

    public mineBlock(): void {
        this.hash = this.block.mineBlock();
        this.nonce = this.block.getNonce();
        this.isValidHash = this.checkValidHash();
    }
}
