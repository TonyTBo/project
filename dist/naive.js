"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNumberOfCrossings = exports.makeVisabilityGraph = exports.dijkstra = exports.crosses = exports.readInput = void 0;
const _1 = require(".");
//ok
function readPoint() {
    let x, y;
    console.log(`x: ${x} -- y: ${y}`);
    let p = new _1.point(x, y);
    return p;
}
function readInput(start, end, testTitle, polygons, points) {
    //Read start and end points
    start = readPoint();
    end = readPoint();
    points.push(start);
    var numberOfPolygons; // not yet
    //Iterate through the polygons
    for (let i = 0; i < numberOfPolygons; i++) {
        let numberOfSides;
        //Get the first point and remember it 
        //so we can make the last linesegment after the loop
        let firstPoint = readPoint();
        //Create a variable for the last point we saw
        let lastPoint = firstPoint;
        //Add the first point
        points.push(firstPoint);
        for (let j = 0; j < numberOfSides; j++) {
            //Get the next point
            let currentPoint = readPoint();
            //Add point to list of points
            points.push(currentPoint);
            //create linesegment
            let l;
            //Set the linesegment
            l.p = lastPoint;
            l.q = currentPoint;
            //push it to the list of linesegments
            polygons[i].push(l);
            //and update the lastPoint
            lastPoint = currentPoint;
        }
        //Construct the missing linesegment
        let l;
        l.p = lastPoint;
        l.q = firstPoint;
        //and push it to the vector
        polygons[i].push(l);
    }
    points.push(end);
}
exports.readInput = readInput;
//ok
//Function for calculating the distance between two points
function dist(p, q) {
    //calculate euclidean distance sqrt( (p.x-q.x)^2+(p.y-q.y)^2 )
    return Math.sqrt(Math.pow(p.x - q.x, 2.0) + Math.pow(p.y - q.y, 2.0));
}
//ok
function rightTurn(p1, p2, p3) {
    return (p1.y - p2.y) * (p2.x - p3.x) - (p2.y - p3.y) * (p1.x - p2.x);
}
//ok
function crosses(l1, l2) {
    if (l1 == l2)
        return -1;
    let returnValue = 0;
    if (l1.p == l2.p)
        returnValue++;
    if (l1.p == l2.q)
        returnValue++;
    if (l1.q == l2.p)
        returnValue++;
    if (l1.q == l2.q)
        returnValue++;
    if (returnValue > 0)
        return returnValue;
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
        returnValue = 10;
    }
    return returnValue;
}
exports.crosses = crosses;
//ok
//Takes a line segment and returns the number of polygon edges it crosses
function numberOfCrossings(polygons, l) {
    let n = 0;
    for (let i = 0; i < polygons.length; i++) {
        let numberOfVaolation = 0;
        for (let j = 0; j < polygons[i].length; j++) {
            let result = crosses(l, polygons[i][j]);
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
    }
    return n;
}
class Stack {
    constructor(capacity = Infinity) {
        this.capacity = capacity;
        this.storage = [];
    }
    push(item) {
        if (this.size() === this.capacity) {
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    pop() {
        return this.storage.pop();
    }
    top() {
        return this.storage[0];
    }
    peek() {
        return this.storage[this.size() - 1];
    }
    size() {
        return this.storage.length;
    }
}
//Implementation of dijkstra
//Takes a graph and a start and end point in the graph
//returns the distance
function dijkstra(graphDistance, graph, route) {
    var start = 0, end = graph.length - 1;
    // route.reverse(graph.length);
    var visited;
    const pq = new Stack();
    // var pq!: Array<tuple: [number, number, number]>;
    var tuple = [0, start, -1];
    pq.push(tuple);
    while (pq.size() != 0) {
        let t = tuple;
        pq.pop();
        let distanceSoFar = -1 * t[0];
        let current = t[1];
        let whereFrom = t[2];
        if (visited[current])
            continue;
        route[current] = whereFrom;
        if (current == end)
            return distanceSoFar;
        visited[current] = true;
        for (let i = 0; i < graph[current].length; i++) {
            let next = graph[current][i];
            if (visited[next])
                continue;
            let newdistance = distanceSoFar + graphDistance[current][i];
            let newTuple = [-1 * newdistance, next, current];
            pq.push(newTuple);
        }
    }
    return -1;
}
exports.dijkstra = dijkstra;
//ok
function makeVisabilityGraph(graph, graphDistance, crossesNumber, points) {
    //Get how many points we have
    let numberOfPoints = points.length;
    //Go through all pairs of points and calculate the distance
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < numberOfPoints; j++) {
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
exports.makeVisabilityGraph = makeVisabilityGraph;
//ok
function calculateNumberOfCrossings(crossesNumber, polygons, points) {
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            let l;
            l.p = points[i];
            l.q = points[j];
            //Call numberOfCrossings, which 
            //suprise suprise counts the number of crossings
            crossesNumber[i][j] = numberOfCrossings(polygons, l);
        }
    }
    return 0;
}
exports.calculateNumberOfCrossings = calculateNumberOfCrossings;
//# sourceMappingURL=naive.js.map