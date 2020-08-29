import {Item} from "@/game/items/Item";
import {Inventory} from "@/game/features/inventory/Inventory";
import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";

export class EquipableInventory extends Item {
    inventory: Inventory;

    constructor(id: ItemId, inventory: Inventory) {
        super(id, ItemType.Global);
        this.inventory = inventory;
    }
}
