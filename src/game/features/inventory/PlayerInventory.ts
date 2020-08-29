import {Inventory} from "./Inventory";
import {InventoryId} from "./InventoryId";
import {ItemId} from "../../items/ItemId";

export class PlayerInventory {
    inventorySlots = 3;
    inventories: Inventory[] = []


    consumeItem(inventory: InventoryId, index: number) {
        this.getSubInventory(inventory).consumeItem(index);
    }

    gainItem(inventory: InventoryId, id: ItemId, amount: number = 1) {
        // Check subinventories for best stack to add to
        this.getSubInventory(inventory).gainItem(id, amount);
    }

    loseItem(inventory: InventoryId, index: number, amount: number = 1) {
        this.getSubInventory(inventory).loseItem(index, amount);
    }

    private getSubInventory(id: InventoryId): Inventory {
        for (const inventory of this.inventories) {
            if (inventory.id === id) {
                return inventory;
            }
        }
        throw new Error(`Could not find inventory with id ${id}`);
    }
}
