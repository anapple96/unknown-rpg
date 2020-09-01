export class Random {
    /**
     * Return a random integer between min (inclusive) and max (exclusive)
     * @param min inclusive
     * @param max exclusive
     */
    static intBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * Return a random float between min (inclusive) and max (exclusive)
     * @param min inclusive
     * @param max exclusive
     */
    static floatBetween(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static arrayIndex<T>(array: T[]): number {
        return this.intBetween(0, array.length);
    }

    static fromArray<T>(array: T[]): T {
        return array[this.arrayIndex(array)];
    }
}
