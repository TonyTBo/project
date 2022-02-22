"use strict";
class Queue {
    constructor(array = []) {
        this._queue = array;
        this._head = 0;
        this._tail = array.length;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this._tail;
    }
    enqueue(value) {
        this._queue[this._tail] = value;
        this._tail++;
    }
    dequeue() {
        const value = this._queue[this._head];
        delete this._queue[this._head];
        this._head++;
        return value;
    }
    peek() {
        return this._queue[this._head];
    }
    clear() {
        this._queue = [];
        this._head = 0;
        this._tail = 0;
    }
}
//# sourceMappingURL=Queue.js.map