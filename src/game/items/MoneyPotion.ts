import {Consumable} from "@/game/items/Consumable";
import {Item} from "@/game/items/Item";
import {App} from "@/App";
import {ItemId} from "@/game/items/ItemId";
import {ItemType} from "@/game/items/ItemType";

export class MoneyPotion extends Item implements Consumable {
    value: number;


    constructor(value: number) {
        super("Money Potion", ItemId.MoneyPotion, ItemType.Global, 3);
        this.value = value;
    }

    consume(): void {
        App.game.wallet.gainMoney(this.value);
    }

    canConsume(): boolean {
        return true;
    }

}
