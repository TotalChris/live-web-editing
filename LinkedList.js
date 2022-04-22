import { Cell } from './Cell.js';
export class LinkedList {
    constructor() {
        this.start = undefined;
        this.end = undefined;
        this.size = 0;
    }
    getValue(index) {
        return this.get(index).data;
    }
    get(index) {
        let pointer = (index <= this.size / 2 ? this.start : this.end);
        let currentValue = (index <= this.size / 2 ? this.start.data : this.end.data);
        for (var i = (index <= this.size / 2 ? 0 : this.size - 1); i != index; i = i + (index <= this.size / 2 ? 1 : -1)) {
            pointer = pointer.heads.get((index <= this.size / 2 ? 'next' : 'prev'));
            currentValue = pointer.data;
        }
        return pointer;
    }
    traverse() {
        const array = new Array();
        if (this.size == 0) {
            return array;
        }
        const addToArray = (cell) => {
            array.push(cell?.data);
            return cell?.heads.get('next') != undefined ? addToArray(cell?.heads.get('next')) : array;
        };
        return addToArray(this.start);
    }
    precede(data) {
        let cell = new Cell(data);
        if (this.size == 0 || !this.start) {
            this.end = cell;
            cell.heads.set('prev', undefined);
            cell.heads.set('next', undefined);
        }
        else {
            this.start.heads.set('prev', cell);
            cell.heads.set('prev', undefined);
            cell.heads.set('next', this.start);
        }
        this.start = cell;
        this.size++;
        return cell;
    }
    append(data) {
        let cell = new Cell(data);
        if (this.size == 0 || !this.end) {
            this.start = cell;
            cell.heads.set('prev', undefined);
            cell.heads.set('next', undefined);
        }
        else {
            this.end.heads.set('next', cell);
            cell.heads.set('prev', this.end);
            cell.heads.set('next', undefined);
        }
        this.end = cell;
        this.size++;
        return cell;
    }
    insert(data, pos) {
        if (pos > this.size || pos < 0) {
            throw new Error("Index out of bounds");
        } else {
            switch (pos) {
                case 0:
                    this.precede(data);
                    break;
                case this.size:
                    this.append(data);
                    break;
                default:
                    let add = new Cell(data);
                    let next = this.get(pos);
                    let prev = this.get(pos - 1)
                    add.heads.set('next', next);
                    add.heads.set('prev', prev);
                    next.heads.set('prev', add);
                    prev.heads.set('next', add);
                    this.size++
                    break;
            }
        }
    }
    remove(cell) {
        if(this.start == cell){
            this.start = undefined;
        }
        if(this.end == cell){
            this.end = undefined;
        }
        let n = cell.heads.get('next');
        let p = cell.heads.get('prev');
        if (p != undefined) {
            p.heads.set('next', (n == undefined ? undefined : n));
        }
        if (n != undefined) {
            n.heads.set('next', (p == undefined ? undefined : p));
        }
        cell.heads.set('prev', undefined);
        cell.heads.set('next', undefined);
        this.size--;
    }
    getSize() {
        return this.size;
    }
}

