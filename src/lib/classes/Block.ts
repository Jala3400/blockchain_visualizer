import crypto from 'crypto-js';

export class Block {
    private prevHash: string;
    private hash: string;
    private data: string;
    private nonce: number;
    private difficulty: number;
    private timestamp: number;

    constructor(prevHash: string, data: string, difficulty: number = 2) {
        this.prevHash = prevHash;
        this.data = data;
        this.timestamp = Date.now();
        this.nonce = 0;
        this.difficulty = difficulty;
        this.hash = this.calculateHash();
    }

    private calculateHash(): string {
        return crypto.SHA256(this.prevHash + this.data + this.timestamp + this.nonce).toString();
    }

    public mineBlock(): void {
        while (this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

    public getHash(): string {
        return this.hash;
    }

    public getPrevHash(): string {
        return this.prevHash;
    }

    public setPrevHash(prevHash: string): void {
        this.prevHash = prevHash;
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

    public getTimestamp(): number {
        return this.timestamp;
    }
}
