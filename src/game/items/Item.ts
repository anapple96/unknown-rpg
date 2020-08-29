import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";

export class Item {
    name: string;
    id: ItemId;
    type: ItemType;
    maxStack: number

    constructor(name: string, id: ItemId, type: ItemType, maxStack: number = 1) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.maxStack = maxStack;
    }
}
