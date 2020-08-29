import {ItemId} from "@/game/items/ItemId";
import {Item} from "@/game/items/Item";
import {ItemType} from "@/game/items/ItemType";
import {MoneyPotion} from "@/game/items/MoneyPotion";

export class ItemList {
    static items: Record<ItemId, Item> = {} as Record<ItemId, Item>;

    static initialize() {
        this.registerItem(new Item(ItemId.Empty, ItemType.Global));
        this.registerItem(new MoneyPotion(10));
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
