import {ItemId} from "@/game/items/ItemId";

export class InventoryItem {
    id: ItemId;
    amount: number;
    maxStack: number;

    constructor(id: ItemId, amount: number, maxStack: number = 1) {
        this.id = id;
        this.amount = amount;
        this.maxStack = maxStack;
    }

    isEmpty(): boolean {
        return this.amount === 0;
    }

    isFull(): boolean {
        return this.amount >= this.maxStack;
    }

    spaceLeft(): number {
        return this.maxStack - this.amount;
    }

    gainItems(amount: number = 1) {
        this.amount += amount;
        if (this.amount > this.maxStack) {
            console.error(`Tried to have more than ${this.maxStack} of ${this.id} in one stack`);
            this.amount = this.maxStack;
        }
    }

    loseItems(amount: number = 1) {
        this.amount -= amount;
        if (this.amount < 0) {
            console.error(`Tried to have less than 0 of ${this.id} in one stack`);
            this.amount = 0;
        }
    }
}
