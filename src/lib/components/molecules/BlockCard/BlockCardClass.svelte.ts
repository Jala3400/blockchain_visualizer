import { Block } from "$lib/classes/Block";
import type { BlockObserver } from "$lib/classes/Block";

export class BlockCardClass implements BlockObserver {
    private block = new Block("", "", 0, 2);
    private prevHash = $state(this.block.getPrevHash());
    private data = $state(this.block.getData());
    private nonce = $state(this.block.getNonce());
    private difficulty = $state(this.block.getDifficulty());
    private hash = $state(this.block.getHash());
    private isValidHash = $state(this.checkValidHash());

    constructor(block: Block) {
        this.block = block;
        this.block.addObserver(this);
        this.update(block);
    }

    public update(block: Block): void {
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

    public mineBlock(): void {
        this.block.mineBlock();
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
        this.block.updatePrevHash(newPrevHash);
    }

    public updateData(newData: string): void {
        this.block.updateData(newData);
    }

    public updateDifficulty(newDifficulty: number): void {
        this.block.updateDifficulty(newDifficulty);
    }

    public updateNonce(newNonce: number): void {
        this.block.updateNonce(newNonce);
    }
}