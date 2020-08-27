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

    playerPosition: WorldLocationIdentifier;

    roads: Road[];
    towns: Town[];

    constructor(roads: Road[], towns: Town[]) {
        super();
        this.roads = roads;
        this.towns = towns;

        this.playerPosition = new TownLocationIdentifier(TownId.SmallTown);
    }

    load(data: WorldSaveData): void {
    }

    parseSaveData(json: Record<string, unknown>): WorldSaveData {
        return new WorldSaveData();
    }

    save(): WorldSaveData {
        return new WorldSaveData()
    }

}
