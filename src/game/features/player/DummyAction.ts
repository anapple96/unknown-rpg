import {PlayerAction} from "@/game/features/player/PlayerAction";
import {App} from "@/App";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";

export class DummyAction extends PlayerAction {

    constructor(description: string, location: WorldLocationIdentifier, duration: number, repeat: number) {
        super(description, location, duration, repeat);
    }

    canPerform(): boolean {
        return true;
    }

    gainReward(): boolean {
        App.game.wallet.gainMoney(1);
        return true;
    }

}
