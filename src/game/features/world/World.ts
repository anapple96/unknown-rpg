import {Feature} from "@/game/Feature";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {TownId} from "@/game/features/world/towns/TownId";
import {WorldSaveData} from "@/game/features/world/WorldSaveData";
import {Road} from "@/game/features/world/roads/Road";
import {Town} from "@/game/features/world/towns/Town";
import {TravelAction} from "@/game/features/world/TravelAction";
import {App} from "@/App";

export class World extends Feature {
    name: string = "World";
    saveKey: string = "world";

    playerLocation: WorldLocationIdentifier;

    roads: Road[];
    towns: Town[];

    constructor(roads: Road[], towns: Town[]) {
        super();
        this.roads = roads;
        this.towns = towns;

        this.playerLocation = new TownLocationIdentifier(TownId.SmallTown);
    }

    /**
     * Try to move from the player location to the target, returns true if possible
     * @param target to move to
     */
    moveToLocation(target: WorldLocationIdentifier): boolean {
        const startingLocation = App.game.player.getPlayerLocationAtEndOfQueue();


        if (startingLocation.equals(target)) {
            console.log(`You're already at ${target}`);
            return false;
        }

        const road = this.getConnectionRoad(startingLocation, target);

        if (road == null) {
            console.log(`There is no road from ${startingLocation} to ${target}`);
            return false;
        }

        const duration = road.baseDifficulty / 25;
        App.game.player.addAction(new TravelAction(startingLocation, duration, target));
        return true;
    }

    setLocation(target: WorldLocationIdentifier) {
        this.playerLocation = target;
    }

    areConnected(from: WorldLocationIdentifier, to: WorldLocationIdentifier): boolean {
        return this.getConnectionRoad(from, to) !== null;
    }

    getConnectionRoad(from: WorldLocationIdentifier, to: WorldLocationIdentifier): Road | null {
        // TODO(@Isha) improve efficiency, this is why you went to uni.
        for (const road of this.roads) {
            // Bidirectional roads
            if (road.from.equals(from) && road.to.equals(to) || road.from.equals(to) && road.to.equals(from)) {
                return road;
            }
        }
        return null;
    }

    load(data: WorldSaveData): void {
        // Empty
    }

    parseSaveData(json: Record<string, unknown>): WorldSaveData {
        return new WorldSaveData();
    }

    save(): WorldSaveData {
        return new WorldSaveData()
    }

}
