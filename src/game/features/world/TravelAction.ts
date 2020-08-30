import {PlayerAction} from "@/game/features/player/PlayerAction";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {App} from "@/App.ts";

export class TravelAction extends PlayerAction {
    targetLocation: WorldLocationIdentifier;


    constructor(location: WorldLocationIdentifier, duration: number, targetLocation: WorldLocationIdentifier) {
        super(`Travel from ${location.id} to ${targetLocation.id}`, location, duration, 0);
        this.targetLocation = targetLocation;
    }

    gainReward(): boolean {
        App.game.world.setLocation(this.targetLocation);
        return true;
    }

}
