import {SkillType} from "@/game/features/skill/SkillType";
import {SkillNum} from "@/game/features/skill/SkillNum";

export class Skill {
    name: string;
    id: SkillNum;
    type: SkillType;
    maxLevel: number;
    baseExp: number;
    levelScale: number;

    constructor(name: string, id: SkillNum, type: SkillType, maxLevel: number = 1, baseExp: number = 1, levelScale: number = 1) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.maxLevel = maxLevel;
        this.baseExp = baseExp;
        this.levelScale = levelScale;
    }
}