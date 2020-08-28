import {App} from "@/App";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";

export abstract class PlayerAction {
    description: string;
    location: WorldLocationIdentifier
    duration: number;
    repeat: number; // 0, x, Infinity (until error)

    isStarted: boolean = false;
    currentProgress: number = 0;

    isFinished: boolean = false;

    // One iteration done
    private _onCompletion = new SimpleEventDispatcher<PlayerAction>();
    // Entire action done
    private _onFinished = new SimpleEventDispatcher<PlayerAction>();


    protected constructor(description: string, location: WorldLocationIdentifier, duration: number, repeat: number) {
        this.description = description;
        this.location = location;
        this.duration = duration;
        this.repeat = repeat;
    }

    perform(delta: number): void {
        if (!this.isStarted || this.isFinished) {
            return;
        }

        this.currentProgress += delta;

        if (this.canBeCompleted()) {
            this.complete();
        }
    }

    canBeCompleted() {
        return this.isStarted && this.currentProgress >= this.duration;
    }

    isAtLocation(): boolean {
        return App.game.world.playerLocation.equals(this.location);
    }

    complete(): void {
        if (this.isFinished) {
            console.warn("Cannot complete action that is already finished");
            return;
        }
        console.log("Action completed");
        this._onCompletion.dispatch(this);
        const canRepeat: boolean = this.gainReward();
        if (canRepeat && this.repeat > 0) {
            this.repeatAction();
        } else {
            this.finish();
        }
    }

    finish(): void {
        console.log("Action finished");
        this.isFinished = true;
        this._onFinished.dispatch(this);
    }

    repeatAction() {
        this.repeat--;
        this.currentProgress = 0;
    }

    abstract canPerform(): boolean;

    start() {
        this.isStarted = true;
    }

    cancel() {
        // Override if needed
    }


    // Override like App.game.inventory.gain(this.lake.randomResource())
    // Return false if something is blocking a repeat (full inventory, wrong location, etc)
    abstract gainReward(): boolean;

    public get onCompletion(): ISimpleEvent<PlayerAction> {
        return this._onCompletion.asEvent();
    }

    public get onFinished(): ISimpleEvent<PlayerAction> {
        return this._onFinished.asEvent();
    }
}
