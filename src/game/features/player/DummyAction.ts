import {PlayerAction} from "@/game/features/player/PlayerAction";
import {App} from "@/App";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {ItemId} from "@/game/items/ItemId";

export class DummyAction extends PlayerAction {

    constructor(description: string, location: WorldLocationIdentifier, duration: number, repeat: number) {
        super(description, location, duration, repeat);
    }

    gainReward(): boolean {
        App.game.wallet.gainMoney(1);
        const couldAdd: boolean = App.game.playerInventory.gainItem(ItemId.Fish1, Math.floor(Math.random() * 6 + 1));
        return couldAdd;
    }

}
