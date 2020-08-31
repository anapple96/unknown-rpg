import {EquipmentType} from "@/game/items/EquipmentType";

export interface Equipable {
    type: EquipmentType;

    // Refactor to ItemStats?
    attack: number;
    defense: number;

}
