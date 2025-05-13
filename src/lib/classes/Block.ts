import crypto from 'crypto-js';

export class Block {
    private prevHash: string;
    private hash: string;
    private data: string;
    private nonce: number;
    private difficulty: number;
    private isMining: boolean = false;
    private onMiningUpdate?: (nonce: number, hash: string) => void;

    constructor(prevHash: string, data: string, nonce: number = 0, difficulty: number = 2) {
        this.prevHash = prevHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.hash = this.calculateHash();
    }

    public isValidHash(): boolean {
        return this.hash.substring(0, this.difficulty) === Array(this.difficulty + 1).join('0');
    }

    public calculateHash(): string {
        return crypto.SHA256(this.prevHash + this.data + this.nonce).toString();
    }

    public setMiningCallback(callback: (nonce: number, hash: string) => void) {
        this.onMiningUpdate = callback;
    }

    public async mineBlock(): Promise<string> {
        this.isMining = true;

        while (!this.isValidHash()) {
            this.nonce++;
            this.hash = this.calculateHash();

            if (this.onMiningUpdate) {
                this.onMiningUpdate(this.nonce, this.hash);
                // Add a small delay to make the animation visible
                await new Promise(resolve => setTimeout(resolve, 20 / Math.sqrt(this.nonce)));
            }
        }

        this.isMining = false;
        return this.hash;
    }

    public isCurrentlyMining(): boolean {
        return this.isMining;
    }

    public getHash(): string {
        return this.hash;
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

    public updatePrevHash(prevHash: string): void {
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    public updateData(data: string): void {
        this.data = data;
        this.hash = this.calculateHash();
    }

    public updateNonce(nonce: number): void {
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    public updateDifficulty(difficulty: number): void {
        this.difficulty = difficulty;
    }
}