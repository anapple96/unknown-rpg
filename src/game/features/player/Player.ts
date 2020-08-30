import {Feature} from "@/game/Feature";
import {PlayerSaveData} from "@/game/features/player/PlayerSaveData";
import {PlayerAction} from "@/game/features/player/PlayerAction";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {TravelAction} from "@/game/features/world/TravelAction";
import {App} from "@/App";

export class Player extends Feature {
    name: string = "Player";
    saveKey: string = "player";

    actionQueue: PlayerAction[];
    maxActions: number = 3;

    constructor() {
        super();
        this.actionQueue = [];
    }


    update(delta: number) {
        if (this.actionQueue.length > 0) {
            if (!this.actionQueue[0].isStarted) {
                const couldStart = this.actionQueue[0].start();
                if (!couldStart) {
                    this.removeFirstAction();
                }
            }
        }

        // Check again in case first action is removed
        if (this.actionQueue.length > 0) {
            this.actionQueue[0].perform(delta);
        }
    }

    cancelAction(action: PlayerAction) {
        const index = this.actionQueue.indexOf(action);
        if (index === -1) {
            console.error(`Could not cancel action ${action.description} as it's not in the queue`);
        }
        this.cancelActionsFromIndex(index);
    }

    cancelActionsFromIndex(index: number) {
        for (let i = index; i < this.actionQueue.length; i++) {
            this.actionQueue[i].cancel();
        }
        this.actionQueue = this.actionQueue.slice(0, index);
    }

    addAction(action: PlayerAction) {
        if (this.actionQueue.length >= this.maxActions) {
            console.log(`You already have ${this.maxActions} actions scheduled.`);
            return;
        }

        if (!App.game.player.getPlayerLocationAtEndOfQueue().equals(action.location)) {
            console.warn(`Cannot schedule action ${action.description}, wrong location after queue`);
            return;
        }

        action.onFinished.subscribe(() => this.removeFirstAction());
        this.actionQueue.push(action);
    }

    // Could be improved to be more bug-safe
    removeFirstAction() {
        this.actionQueue.shift()
    }

    getPlayerLocationAtEndOfQueue(): WorldLocationIdentifier {
        for (let i = this.actionQueue.length - 1; i >= 0; i--) {
            if (this.actionQueue[i] instanceof TravelAction) {
                return (this.actionQueue[i] as TravelAction).targetLocation;
            }
        }
        return App.game.world.playerLocation;
    }

    load(data: PlayerSaveData): void {
        // Empty
    }

    parseSaveData(json: Record<string, unknown>): PlayerSaveData {
        return new PlayerSaveData();
    }

    save(): PlayerSaveData {
        return new PlayerSaveData();
    }

}
