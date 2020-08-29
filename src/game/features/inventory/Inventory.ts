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


    constructor(id: InventoryId, slots: number, acceptedTypes: ItemType[]) {
        this.id = id;
        this.slots = slots;
        this.items = [];
        for (let i = 0; i < this.slots; i++) {
            this.items.push(new InventoryItem(ItemId.Empty, 0));
        }
        this.acceptedTypes = acceptedTypes;
    }

    consumeItem(index: number) {
        const id = this.items[index].id;
        const item = ItemList.getItem(id);

        if (isConsumable(item)) {
            if (this.getAmount(index) > 0 && item.canConsume()) {
                item.consume();
                this.loseItem(index, 1);
            }
        }
    }

    gainItem(id: ItemId, amount: number = 1) {
        // Find stack and add to it or create a new one

    }


    loseItem(index: number, amount: number = 1) {
        this.items[index].amount -= amount;
        if (this.items[index].amount <= 0) {
            this.items[index] = new InventoryItem(ItemId.Empty, 0);
        }
    }

    getAmount(index: number): number {
        return this.items[index].amount;
    }


}
