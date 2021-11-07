import { Cell } from './Cell.js';
export class LinkedList {
    constructor() {
        this.start = undefined;
        this.end = undefined;
        this.size = 0;
    }
    get(index) {
        let pointer = (index <= this.size/2 ? this.start : this.end);
        let currentValue = (index <= this.size/2 ? this.start.data : this.end.data);
        for(var i = (index <= this.size/2 ? 0 : this.size-1); i != index; i = i + (index <= this.size/2 ? 1 : -1)){
            pointer = pointer.heads.get((index <= this.size/2 ? 'next' : 'prev'));
            currentValue = pointer.data;
        }
        return currentValue;
    }
    traverse() {
        //throw new Error("Method not implemented.");
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
        //throw new Error("Method not implemented.");
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
        //throw new Error("Method not implemented.");
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
    /*insert(data: T, pos: number): Cell<T> {
        throw new Error("Method not implemented.");
        if(pos > this.size){
            throw new Error("Index out of bounds");
        }
    }*/
    remove(cell) {
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
    }
    getSize(){
        return this.size;
    }
}

