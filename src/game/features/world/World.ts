import {Feature} from "@/game/Feature";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {TownId} from "@/game/features/world/towns/TownId";
import {WorldSaveData} from "@/game/features/world/WorldSaveData";
import {Road} from "@/game/features/world/roads/Road";
import {Town} from "@/game/features/world/towns/Town";

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
        if (this.playerLocation.equals(target)) {
            console.log(`You're already at ${target}`);
            return false;
        }
        if (!this.areConnected(this.playerLocation, target)) {
            console.log(`There is no road from ${this.playerLocation} to ${target}`);
            return false;
        }

        this.playerLocation = target;
        return true;
    }

    areConnected(from: WorldLocationIdentifier, to: WorldLocationIdentifier): boolean {
        // TODO(@Isha) improve efficiency, this is why you went to uni.
        for (const road of this.roads) {
            // Bidirectional roads
            if (road.from.equals(from) && road.to.equals(to) || road.from.equals(to) && road.to.equals(from)) {
                return true;
            }
        }
        return false;
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
