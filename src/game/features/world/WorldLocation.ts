import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    requirements: Requirement[]

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, requirements: Requirement[]) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.requirements = requirements;
    }

    canAccess(): boolean {
        for (const requirement of this.requirements) {
            if (!requirement.isCompleted()) {
                return false;
            }
        }
        return true;

    }

    getLockedReason(): string[] {
        let list = [];
        for (const requirement of this.requirements) {
            if (!requirement.isCompleted()) {
                list.push(requirement.lockedReason());
            }
        }
        return list;
    }
}
