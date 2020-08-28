import {WorldLocationType} from "@/game/features/world/WorldLocationType";
import {RoadId} from "@/game/features/world/roads/RoadId";
import {TownId} from "@/game/features/world/towns/TownId";

export abstract class WorldLocationIdentifier {
    type: WorldLocationType;
    id: RoadId | TownId;

    protected constructor(type: WorldLocationType, id: RoadId | TownId) {
        this.type = type;
        this.id = id;
    }

    public toString(): string {
        return `${WorldLocationType[this.type]}: ${this.id};`
    }

    public equals(other: WorldLocationIdentifier): boolean {
        return this.type === other.type && this.id == other.id;
    }
}
