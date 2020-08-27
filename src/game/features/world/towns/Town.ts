import {WorldLocation} from "@/game/features/world/WorldLocation";
import {TownTier} from "@/game/features/world/towns/TownTier";
import {Requirement} from "@/engine/requirements/Requirement";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";

export class Town extends WorldLocation {
    tier: TownTier;


    constructor(identifier: TownLocationIdentifier, displayName: string, tier: TownTier, requirements: Requirement[] = []) {
        super(identifier, displayName, requirements);
        this.tier = tier;
    }
}
