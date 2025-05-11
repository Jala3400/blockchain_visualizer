import crypto from 'crypto-js';

export class Block {
    private prevHash: string;
    private hash: string;
    private data: string;
    private nonce: number;
    private difficulty: number;

    constructor(prevHash: string, data: string, nonce: number = 0, difficulty: number = 2) {
        this.prevHash = prevHash;
        this.data = data;
        this.nonce = 0;
        this.difficulty = difficulty;
        this.hash = this.calculateHash();
    }

    public calculateHash(): string {
        return crypto.SHA256(this.prevHash + this.data + this.nonce).toString();
    }

    public mineBlock(): string {
        while (this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        return this.hash;
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
        this.hash = this.calculateHash();
    }
}