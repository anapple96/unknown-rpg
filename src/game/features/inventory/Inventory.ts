import {InventoryId} from "@/game/features/inventory/InventoryId";
import {InventoryItem} from "@/game/features/inventory/InventoryItem";
import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";
import {ItemList} from "@/game/items/ItemList";
import {Consumable, isConsumable} from "@/game/items/Consumable";

export class Inventory {
    id: InventoryId;
    slots: number;
    items: InventoryItem[];
    acceptedTypes: ItemType[];

    itemRepresentation: ItemId;

    constructor(id: InventoryId, slots: number, acceptedTypes: ItemType[], itemRepresentation: ItemId) {
        this.id = id;
        this.slots = slots;
        this.items = [];
        for (let i = 0; i < this.slots; i++) {
            this.items.push(new InventoryItem(ItemId.Empty, 0, 0));
        }
        this.acceptedTypes = acceptedTypes;
        this.itemRepresentation = itemRepresentation;
    }

    consumeItem(index: number) {
        const id = this.items[index].id;
        const item = ItemList.getItem(id);


        if (!isConsumable(item)) {
            console.warn(`Item ${item} is not a consumable`);
            return;
        }
        if (this.getAmount(index) <= 0) {
            console.warn(`Amount of ${this.items[index]} is not greater than 0`);
            return;
        }
        if (!item.canConsume()) {
            console.warn("Cannot consume item, check its restrictions for the reason");
            return;
        }

        item.consume();
        this.loseItem(index, 1);
    }

    /**
     * Add items to this inventory, prefer an existing stack
     * Returns whether or not all items could be added
     * @param id
     * @param amount
     */
    gainItem(id: ItemId, amount: number = 1): boolean {
        const item = ItemList.getItem(id);

        // Find stack and add to it or create a new one
        const nonFullStackIndex = this.getIndexOfNonFullStack(id);
        if (nonFullStackIndex === -1) {
            // Create a new stack
            const emptyIndex = this.getIndexOfFirstEmptySlot();
            if (emptyIndex === -1) {
                console.log(`Cannot add ${amount} of ${id}, no empty slots left`);
                return false;
            }
            const amountToAdd = Math.min(amount, item.maxStack);
            this.items.splice(emptyIndex, 1, new InventoryItem(id, amountToAdd, item.maxStack));

            const amountLeft = amount - amountToAdd;
            if (amountLeft <= 0) {
                return true;
            }
            return this.gainItem(id, amountLeft);
        } else {
            // Add to existing stack
            const amountToAdd = Math.min(amount, this.items[nonFullStackIndex].spaceLeft());

            this.items[nonFullStackIndex].gainItems(amountToAdd);
            const amountLeft = amount - amountToAdd;
            if (amountLeft <= 0) {
                return true;
            }
            return this.gainItem(id, amountLeft);
        }
    }

    getIndexOfNonFullStack(id: ItemId) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id && !this.items[i].isFull()) {
                return i;
            }
        }
        return -1;
    }

    getIndexOfFirstEmptySlot(): number {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].isEmpty()) {
                return i;
            }
        }
        return -1;
    }

    hasEmptySlot(): boolean {
        return this.getIndexOfFirstEmptySlot() !== -1;
    }

    hasNonFullStack(id: ItemId): boolean {
        return this.getIndexOfNonFullStack(id) !== -1;
    }


    loseItem(index: number, amount: number = 1) {
        this.items[index].amount -= amount;
        if (this.items[index].amount <= 0) {
            this.items.splice(index, 1, new InventoryItem(ItemId.Empty, 0, 0));
        }
    }

    dropStack(index: number) {
        this.loseItem(index, this.items[index].amount);
    }

    getTotalAmount(id: ItemId): number {
        let total = 0;
        for (const item of this.items) {
            if (item.id === id) {
                total += item.amount;
            }
        }
        return total;
    }

    getAmount(index: number): number {
        return this.items[index].amount;
    }


    isEmpty(): boolean {
        for (const item of this.items) {
            if (item.amount != 0) {
                return false;
            }
        }
        return true;
    }

    acceptsType(type: ItemType): boolean {
        return this.acceptedTypes.includes(type);
    }
}
