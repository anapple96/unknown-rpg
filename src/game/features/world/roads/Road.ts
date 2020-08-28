import {WorldLocation} from "@/game/features/world/WorldLocation";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";
import {RoadLocationIdentifier} from "@/game/features/world/roads/RoadLocationIdentifier";

export class Road extends WorldLocation {
    from: WorldLocationIdentifier;
    to: WorldLocationIdentifier;
    baseDifficulty: number;


    constructor(identifier: RoadLocationIdentifier, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, baseDifficulty: number, requirements: Requirement[] = []) {
        super(identifier, displayName, requirements);
        this.from = from;
        this.to = to;
        this.baseDifficulty = baseDifficulty;
    }
}
