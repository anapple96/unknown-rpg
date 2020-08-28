import {Feature} from "@/game/Feature";
import {PlayerSaveData} from "@/game/features/player/PlayerSaveData";
import {PlayerAction} from "@/game/features/player/PlayerAction";

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
            if(!this.actionQueue[0].isStarted) {
                this.actionQueue[0].start();
            }
            this.actionQueue[0].perform(delta);
        }
    }

    addAction(action: PlayerAction) {
        if (this.actionQueue.length >= this.maxActions) {
            console.log(`You already have ${this.maxActions} actions scheduled.`);
            return;
        }

        action.onFinished.subscribe(() => this.removeFirstAction());
        this.actionQueue.push(action);
    }

    // Could be improved to be more bug-safe
    removeFirstAction() {
        this.actionQueue.shift()
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
