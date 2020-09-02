
import {SkillType} from "@/game/features/skill/SkillType";
import {SkillNum} from "@/game/features/skill/SkillNum";
import {Skill} from "@/game/features/skill/Skill";

export class SkillList {
    static skills: Record<SkillNum, Skill> = {} as Record<SkillNum, Skill>;

    static initialize() {
        this.registerSkill(new Skill("Woodcutting", SkillNum.Woodcutting, SkillType.Woodcutting, 99, 100, 1.5));
        this.registerSkill(new Skill("Mining", SkillNum.Mining, SkillType.Mining, 99, 100, 1.5));
        this.registerSkill(new Skill("Fishing", SkillNum.Fishing, SkillType.Fishing, 99, 100, 1.5));
        this.registerSkill(new Skill("Cooking", SkillNum.Cooking, SkillType.Cooking, 99, 100, 1.5));
        this.registerSkill(new Skill("Crafting", SkillNum.Crafting, SkillType.Crafting, 99, 100, 1.5));
        this.registerSkill(new Skill("Fletching", SkillNum.Fletching, SkillType.Fletching, 99, 100, 1.5));
        this.registerSkill(new Skill("Smithing", SkillNum.Smithing, SkillType.Smithing, 99, 100, 1.5));
        this.registerSkill(new Skill("Magic", SkillNum.Magic, SkillType.Magic, 99, 100, 1.5));
        this.registerSkill(new Skill("Firemaking", SkillNum.Firemaking, SkillType.Firemaking, 99, 100, 1.5));
        this.registerSkill(new Skill("Farming", SkillNum.Farming, SkillType.Farming, 99, 100, 1.5));
        this.registerSkill(new Skill("Herblore", SkillNum.Herblore, SkillType.Herblore, 99, 100, 1.5));
        this.registerSkill(new Skill("Combat", SkillNum.Combat, SkillType.Combat, 99, 100, 1.5));
    }

    static registerSkill(skill: Skill) {
        this.skills[skill.id] = skill;
    }

    static getSkill(id: SkillNum): Skill {
        if (this.skills[id] == null) {
            console.error(`Could not find Skill with id ${id}`);
        }
        return this.skills[id];
    }
}