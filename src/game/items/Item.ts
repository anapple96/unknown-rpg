import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";

export class Item {
    id: ItemId;
    type: ItemType;


    constructor(id: ItemId, type: ItemType) {
        this.id = id;
        this.type = type;
    }
}
