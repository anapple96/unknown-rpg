import {Item} from "@/game/items/Item";
import {Inventory} from "@/game/features/inventory/Inventory";
import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";
import {Consumable} from "@/game/items/Consumable";
import {App} from "@/App";

export class EquipableInventory extends Item implements Consumable {
    inventory: Inventory;

    constructor(name: string, id: ItemId, inventory: Inventory) {
        super(name, id, ItemType.Global, 1);
        this.inventory = inventory;
    }

    canConsume(): boolean {
        return true;
    }

    consume(): void {
        App.game.playerInventory.enableInventory(this.inventory);
    }
}
