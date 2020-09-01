import {Outcome} from "@/engine/probability/Outcome";
import {Random} from "@/engine/probability/Random";

export class UniformDistribution<T> {
    outcomes: Outcome<T>[];

    constructor(outcomes: Outcome<T>[] = []) {
        this.outcomes = outcomes;
    }

    draw(): T {
        const totalWeight = this.getTotalWeight();
        const random = Random.floatBetween(0, totalWeight);

        let weight: number = 0;
        for (const outcome of this.outcomes) {
            weight += outcome.weight;
            if (random <= weight) {
                return outcome.item;
            }
        }
        console.error(`Could not draw an item for random ${random}. This should never happen`);
        return Random.fromArray(this.outcomes).item;
    }

    /**
     * Calculate the total weight of all outcomes
     */
    getTotalWeight(): number {
        let weight = 0;
        for (const outcome of this.outcomes) {
            weight += outcome.weight;
        }
        return weight;
    }

    /**
     * Normalize the weights so they sum to 1
     */
    normalize(): void {
        const weight = this.getTotalWeight();
        for (const outcome of this.outcomes) {
            outcome.weight /= weight;
        }
    }

    addOutcome(outcome: Outcome<T>) {
        this.outcomes.push(outcome);
    }

    removeOutcome(outcome: Outcome<T>) {
        const index = this.outcomes.indexOf(outcome);
        if (index !== -1) {
            this.outcomes.splice(index, 1);
        }
    }
}
