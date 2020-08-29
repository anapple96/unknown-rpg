import {ItemId} from "@/game/items/ItemId";
import {Item} from "@/game/items/Item";
import {ItemType} from "@/game/items/ItemType";
import {MoneyPotion} from "@/game/items/MoneyPotion";
import {EquipableInventory} from "@/game/items/EquipableInventory";
import {Inventory} from "@/game/features/inventory/Inventory";
import {InventoryId} from "@/game/features/inventory/InventoryId";

export class ItemList {
    static items: Record<ItemId, Item> = {} as Record<ItemId, Item>;

    static initialize() {
        this.registerItem(new Item("Empty", ItemId.Empty, ItemType.Global));
        this.registerItem(new MoneyPotion(10));
        this.registerItem(new EquipableInventory("Fish Inventory", ItemId.FishInventory1, new Inventory(InventoryId.Fish1, 6, [ItemType.Fish], ItemId.FishInventory1)));
        this.registerItem(new Item("Fish1", ItemId.Fish1, ItemType.Global, 5));
    }

    static registerItem(item: Item) {
        this.items[item.id] = item;
    }

    static getItem(id: ItemId): Item {
        if (this.items[id] == null) {
            console.error(`Could not find item with id ${id}`);
        }
        return this.items[id];
    }
}
