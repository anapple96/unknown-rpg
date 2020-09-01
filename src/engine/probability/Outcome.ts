export class Outcome<T> {
    public item: T;
    public weight: number;

    constructor(item: T, weight: number) {
        this.item = item;
        this.weight = weight;
    }
}
