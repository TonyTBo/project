import { lineSegment, point } from ".";

// import  queue   from "./Queue";
//ok
function readPoint(a: string) {
    let split_a = a.split(",")
    let x: number = Number(split_a[0]);
    let y: number = Number(split_a[1]);
    // console.log(`x: ${x} -- y: ${y}`);
    let p = new point(x, y);
    return p;
}

function CreateArrayWithRows(size: number) {
    var x = new Array(size);
    for (var i = 0; i < size; i++) {
        x[i] = new Array();
    }
    return x;
}

export async function readInput(this: any, start: point, end: point, testTitle: string, polygons: Array<Array<lineSegment>>, points: Array<point>, readFile: String) {
    //Read start and end points
    const lines = readFile.split('\n')
    testTitle = lines[0]

    start = readPoint(lines[1]);
    end = readPoint(lines[2]);

    let line3 = Number(lines[3])
    let listLine4: string[][] = [[]];
    for (let i = 4; i < lines.length; i++) {
        let a: string[] = lines[i].split(" ");
        listLine4?.push(a)
    }
    listLine4.shift()
    console.log("listLine4--->", listLine4)

    points.push(start);
    // let polygons_ = await CreateArrayWithRows(line3);
    // var numberOfPolygons!: number; // not yet
    //Iterate through the polygons
    polygons.shift()

    for (let i = 0; i < line3; i++) {
        polygons.push([])
        let numberOfSides: number = listLine4[i].length;

        //Get the first point and remember it 
        //so we can make the last linesegment after the loop
        let firstPoint: point = readPoint(lines[1]);

        //Create a variable for the last point we saw
        let lastPoint: point = readPoint(lines[2]);

        //Add the first point
        // points.push(firstPoint);
        // polygons.shift()

        for (let j = 1; j < numberOfSides; j++) {
            //Get the next point
            let currentPoint = readPoint(listLine4[i][j]);
            console.log("xxxxxx--->", lastPoint, currentPoint)
            // console.log("lastPoint--->", lastPoint)

            //Add point to list of points
            points.push(currentPoint);

            //create linesegment
            let l = new lineSegment(lastPoint, currentPoint)
            //Set the linesegment
            l.p = lastPoint;
            l.q = currentPoint;

            //push it to the list of linesegments
            polygons[i]?.push(l);

            //and update the lastPoint
            lastPoint = currentPoint;
            console.log('polygon-->', polygons)
        }
        //Construct the missing linesegment
        let l = new lineSegment(lastPoint, firstPoint)
        l.p = lastPoint;
        l.q = firstPoint;

        //and push it to the vector
        polygons[i]?.push(l);

    }
    points.push(end);
    // polygons.pop();
    return await { start, end, testTitle, polygons, points }
}

//ok
//Function for calculating the distance between two points
function dist(p: point, q: point): number {
    //calculate euclidean distance sqrt( (p.x-q.x)^2+(p.y-q.y)^2 )
    return Math.sqrt(Math.pow(p.x - q.x, 2.0) + Math.pow(p.y - q.y, 2.0));
}

//ok
function rightTurn(p1: point, p2: point, p3: point): number {
    return (p1.y - p2.y) * (p2.x - p3.x) - (p2.y - p3.y) * (p1.x - p2.x);
}

//ok
export function crosses(l1: lineSegment, l2: lineSegment) {
    if (l1 == l2) return -1;
    let returnValue: number = 0;
    if (l1.p == l2.p) returnValue++;
    if (l1.p == l2.q) returnValue++;
    if (l1.q == l2.p) returnValue++;
    if (l1.q == l2.q) returnValue++;

    if (returnValue > 0) return returnValue;
    let rt_1 = rightTurn(l1.p, l1.q, l2.p);
    let rt_2 = rightTurn(l1.p, l1.q, l2.q);
    let rt_3 = rightTurn(l2.p, l2.q, l1.p);
    let rt_4 = rightTurn(l2.p, l2.q, l1.q);

    let r1 = rt_1 * rt_2;
    let r2 = rt_3 * rt_4;

    if ((r1 == 0 && r2 <= 0) || (r2 == 0 && r1 <= 0)) {
        returnValue = 10;
    }
    if ((r1 <= 0) && (r2 <= 0)) {
        returnValue = 10
    }
    return returnValue;
}

//ok
//Takes a line segment and returns the number of polygon edges it crosses
function numberOfCrossings(polygons: Array<Array<lineSegment>>, l: lineSegment) {
    let n: number = 0;
    for (let i: number = 0; i < polygons.length; i++) {
        let numberOfVaolation: number = 0;
        for (let j: number = 0; j < polygons[i].length; j++) {
            let result: number = crosses(l, polygons[i][j]);
            if (result == -1) {
                return 0;
            }
            else if (result == 10) {
                numberOfVaolation = 10;
            }
            else {
                numberOfVaolation += result;
            }
        }
        if (numberOfVaolation > 2) {
            n++;
        }
    } return n;
}

// class Queue {
//     public _queue: any[];
//     public _head: number;
//     private _tail: number;

//     constructor(array: any[] = []) {
//         this._queue = [];
//         this._head = 0;
//         this._tail = array.length;
//     }

//     isEmpty() {
//         return this.size() === 0;
//     }

//     size() {
//         return this._tail;
//     }

//     enqueue(value: any) {
//         this._queue[this._tail] = value;
//         this._tail++;
//     }

//     dequeue() {
//         const value = this._queue[this._head];
//         this._queue.splice(this._head, 1)
//         // delete this._queue[this._head];
//         this._head ++;
//         return value;
//     }

//     peek() {
//         return this._queue[this._head];
//     }
//     //./a.out < test/test3.txt -k -p > test/test.svg
//     clear() {
//         this._queue = [];
//         this._head = 0;
//         this._tail = 0;
//     }
// }

class Queue {
    private _elements: any[]

    constructor(elements: any[] = []) {
        this._elements = [];
    }

    size() {
        return this._elements.length;
    }

    enqueue(item: any) {
        this._elements.unshift(item);
        return true;
    }

    dequeue() {
        return this._elements.pop();
    }

    peek() {
        return this._elements[0];
    }

    clear() {
        this._elements = []
        this._elements.length = 0;
    }
}


//Implementation of dijkstra
//Takes a graph and a start and end point in the graph
//returns the distance
export function dijkstra(graphDistance: Array<Array<number>>, graph: Array<Array<number>>, route: Array<number>) {
    let start = 0;
    let end = graph.length - 1;

    //Create a vector to see if we already visited the point
    let visited: Array<boolean> = new Array();

    const pq = new Queue();
    // var pq!: Array<tuple: [number, number, number]>;

    let tuple: [number, number, number] = [0, start, -1];
    pq.enqueue(tuple);
    console.log(pq.peek())
    console.log()
    while (pq.size() != 0) {
        //@ts-ignore
        const t: [number, number, number] = pq.peek();

        pq.dequeue();

        //How far have we travelled until now
        let distanceSoFar = Number(-1 * t[0]);

        //What point are we at
        let current: number = t[1];
        let whereFrom: number = t[2];

        //If we already visited the current continue
        if (visited[current]) continue;

        route[current] = whereFrom;
        if (current == end) return distanceSoFar;

        //Set the current to true in the visited vector
        visited[current] = true;

        //Go through every current we have an edge to and haven't visited
        for (let i = 0; i < graph[current].length; i++) {
            let next = graph[current][i];
            if (visited[next]) continue;

            //calculate the complete distance to that current
            let newdistance: number = distanceSoFar + graphDistance[current][i];

            let newTuple: [number, number, number] = [-1 * newdistance, next, current];

            pq.enqueue(newTuple);
        }
    }
    return -1;
}

//ok
export function makeVisabilityGraph(graph: Array<Array<number>>, graphDistance: Array<Array<number>>, crossesNumber: Array<Array<number>>, points: Array<point>) {
    //Get how many points we have
    let numberOfPoints = points.length;

    //Go through all pairs of points and calculate the distance
    for (let i: number = 0; i < graph.length; i++) {
        for (let j: number = 0; j < numberOfPoints; j++) {
            let from = i;

            let from_point_index = from % numberOfPoints;

            let to_point_index = j;

            let to = (i / numberOfPoints) * numberOfPoints + crossesNumber[from_point_index][j] * numberOfPoints + j;

            //If it is the same point don't make an edge
            if (graph.length > to) {
                //Call dist function to calculate the distance
                let distance = dist(points[from_point_index], points[to_point_index]);

                graphDistance[from].push(distance);
                graph[from].push(to);
            }
        }
    }
    return 0;
}



//ok
export function calculateNumberOfCrossings(crossesNumber: Array<Array<number>>, polygons: Array<Array<lineSegment>>, points: Array<point>) {
    for (let i: number = 0; i < points.length; i++) {
        for (let j: number = 0; j < points.length; j++) {
            let l = new lineSegment(points[i], points[j]);
            l.p = points[i];
            l.q = points[j];

            //Call numberOfCrossings, which 
            //suprise suprise counts the number of crossings
            crossesNumber[i][j] = numberOfCrossings(polygons, l);
        }
    }
    return 0;
}