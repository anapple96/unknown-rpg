import {WorldLocationType} from "@/game/features/world/WorldLocationType";
import {TownId} from "@/game/features/world/towns/TownId";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";

export class TownLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: TownId) {
        super(WorldLocationType.Town, id)
    }
}
