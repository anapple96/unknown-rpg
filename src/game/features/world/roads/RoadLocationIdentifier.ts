import {WorldLocationType} from "@/game/features/world/WorldLocationType";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {RoadId} from "@/game/features/world/roads/RoadId";

export class RoadLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: RoadId) {
        super(WorldLocationType.Road, id)
    }
}
