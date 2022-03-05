class NodeArr {
    key: any;
    priority: any;
    constructor(key: any, priority: any) {
        this.key = key
        this.priority = priority
    }
}


export class PriorityQueue1 {
    data: any[];
    constructor() {
        this.data = []
    }

    swap = (arr: { [x: string]: any; }, i: string | number, j: string | number) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    size(){
        return this.data.length;
    }

    push(key: any, priority: any) {
        const node = new NodeArr(key, priority);
        this.data.push(node);
        let index = this.data.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.data[parentIndex];
            if (node.priority < parent.priority) {
                this.swap(this.data, index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }


    pop() {
        const minNode = this.data[0] || {};
        const lastNode = this.data.pop();
        if (this.data.length < 1) {
            return minNode;
        }
        this.data[0] = lastNode;
        let index = 0;
        while (index < this.data.length) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            const leftNode = this.data[leftIndex] || {};
            const rightNode = this.data[rightIndex] || {};
            let smallerIndex;
            if (leftNode.priority < lastNode.priority) {
                smallerIndex = leftIndex;
            }
            if (!smallerIndex && rightNode.priority < lastNode.priority) {
                smallerIndex = rightIndex;
            }
            if (smallerIndex && rightNode.priority < leftNode.priority) {
                smallerIndex = rightIndex;
            }
            if (!smallerIndex) {
                break;
            }
            this.swap(this.data, smallerIndex, index);
            index = smallerIndex;
        }
        return minNode;
    }
}


