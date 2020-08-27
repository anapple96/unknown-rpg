import {World} from "@/game/features/world/World";
import {Road} from "@/game/features/world/roads/Road";
import {Town} from "@/game/features/world/towns/Town";
import {RoadLocationIdentifier} from "@/game/features/world/roads/RoadLocationIdentifier";
import {RoadId} from "@/game/features/world/roads/RoadId";
import {TownId} from "@/game/features/world/towns/TownId";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";
import {TownTier} from "@/game/features/world/towns/TownTier";

export class WorldBuilder {

    static createWorld(): World {
        const roads = [
            this.createRoad(RoadId.OldTownRoad, "Old Town Road", new TownLocationIdentifier(TownId.SmallTown), new TownLocationIdentifier(TownId.ToonTown), 100),
        ]

        const towns = [
            this.createTown(TownId.ToonTown, "Toon Town", TownTier.Town),
        ]

        return new World(roads, towns);
    }

    static createRoad(id: RoadId, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, baseDifficulty: number, requirements: Requirement[] = []): Road {
        return new Road(new RoadLocationIdentifier(id), displayName, from, to, baseDifficulty, requirements);
    }

    static createTown(id: TownId, displayName: string, tier: TownTier, requirements: Requirement[] = []): Town {
        return new Town(new TownLocationIdentifier(id), displayName, tier, requirements);
    }
}
