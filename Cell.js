export class Cell {
    constructor(data) {
        this.data = undefined;
        this.data = (!data ? undefined : data);
        this.heads = new Map();
    }
}
