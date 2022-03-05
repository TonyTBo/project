import { lineSegment, point } from ".";

import  { Queue }   from "./Queue";

import  { PriorityQueue }   from "./PriorityQueue";

//ok
function readPoint(a: string) {
    if(a != undefined){
        let split_a = a.split(",")
        let x: number = Number(split_a[0]);
        let y: number = Number(split_a[1]);
        console.log(`x: ${x} -- y: ${y}`);
        let p = new point(x, y);
        return p;
    }
   
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

    points.push(start);

    //Iterate through the polygons
    polygons.shift()
    
    for (let i = 0; i < line3; i++) {
        listLine4[i].shift()
        polygons.push([])
        let numberOfSides: number = listLine4[i].length;

        //Get the first point and remember it 
        //so we can make the last linesegment after the loop
        let firstPoint: point = readPoint(listLine4[i][0]);

        //Create a variable for the last point we saw
        let lastPoint: point = firstPoint;

        //Add the first point
        points.push(firstPoint);
        // polygons.shift()

        for (let j = 0; j < numberOfSides-1; j++) {
            //Get the next point
            let currentPoint = readPoint(listLine4[i][j+1]);

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
        }
        //Construct the missing linesegment
        let l = new lineSegment(lastPoint, firstPoint)
        l.p = lastPoint;
        l.q = firstPoint;

        //and push it to the vector
        polygons[i]?.push(l);

    }
    console.log("end-->", end)
    points.push(end);
    // console.log("point-->", points)
    // console.log("polygons-->", polygons)
    return await { start, end, testTitle, polygons, points }
}


//ok
function rightTurn(p1: point, p2: point, p3: point) {
    return (p1.y - p2.y) * (p2.x - p3.x) - (p2.y - p3.y) * (p1.x - p2.x);
}

//ok
export function crosses(l1: lineSegment, l2: lineSegment) {
    if (l1.p == l2.p && l1.q == l2.q || l1.p == l2.q && l1.q == l2.p) return -1;
    let returnValue = 0;
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
    let n = 0;
    for (let i = 0; i < polygons.length; i++) {
        let numberOfVaolation = 0;
        for (let j = 0; j < polygons[i].length; j++) {

            let result = crosses(l, polygons[i][j]);

            // console.log("result - naive-->", result)
            
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

//Implementation of dijkstra
//Takes a graph and a start and end point in the graph
//returns the distance
export function dijkstra(graphDistance: Array<Array<any>>, graph: Array<Array<number>>, route: Array<number>) {
    let start = 0;
    let end = graph.length - 1;

    //Create a vector to see if we already visited the point
    let visited: Array<boolean> = new Array();

    const pq = new PriorityQueue();
    // var pq!: Array<tuple: [number, number, number]>;

    let tuple = [0, start, -1];
    pq.push(tuple);
    // console.log("pq berfore -->", pq.length)

    while (pq.size() != 0) {
        //@ts-ignore
        let t: [any, number, number]= pq.top();

        pq.pop();
        // console.log("pq after -->", pq.length)

        //How far have we travelled until now
        let distanceSoFar = -1 * t[0];//0

        //What point are we at
        let current = t[1];// start: 0
        let whereFrom = t[2]; //-1

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
            let newdistance = distanceSoFar + graphDistance[current][i];

            let newTuple: [any, number, number] = [-1 * newdistance, next, current];

            pq.push(newTuple);
        }
    }
    console.log("route--->", route)
    return -1;
}
//route -->-1--0--0--1--2

// Graph
// (0--1--2)
// (0--2--3)
// (0--1--3--4)
// (1--2--4)
// (2--3--4)
// graphDistance
// (0--1--1)
// (1--1.41421--2.23607)
// (1--1.41421--3--3.60555)
// (2.23607--3--2)
// (3.60555--2--0)

//Function for calculating the distance between two points
function dist(p: point, q: point) {
    //calculate euclidean distance sqrt( (p.x-q.x)^2+(p.y-q.y)^2 )
    return Math.sqrt(Math.pow(p.x - q.x, 2.0) + Math.pow(p.y - q.y, 2.0));
}

//ok
export function makeVisabilityGraph(graph: Array<Array<any>>, graphDistance: Array<Array<any>>, crossesNumber: Array<Array<number>>, points: Array<point>) {
    //Get how many points we have
    let numberOfPoints = points.length;
    //console.log("numberOfPoints-->", numberOfPoints, "--graph.length-->", graph.length)//5 - 5
    //Go through all pairs of points and calculate the distance
    for (let i = 0; i < graph.length; i++) {
        for (let j = 0; j < numberOfPoints; j++) {
            let from = i;

            let from_point_index = from%numberOfPoints;

            let to_point_index = j;

            let to = crossesNumber[from_point_index][j] * numberOfPoints + j;

            // console.log('from-->', from, "--from_point_index-->", from_point_index, "--to_point_index-->", to_point_index, "--to-->", to)
            //If it is the same point don't make an edge
            if (graph.length > to) {
                //Call dist function to calculate the distance
                let distance = dist(points[from_point_index], points[to_point_index]);
                // console.log("------> distance", distance)

                graphDistance[from].push(distance);
                graph[from].push(to);
                // console.log("-------------------------------------")
            }
        }
        // console.log("-----------------------------------xong--------------------------------------", i)
    }
    // console.log('xxxx')
    return 0;
}
/*
Graph
(0--1--2--0--0)
(0--2--3--0--0)
(0--1--3--4--0)
(1--2--4--0--0)
(2--3--4--0--0)
graphDistance
(0--1--1--0--0)
(1--1.41421--2.23607--0--0)
(1--1.41421--3--3.60555--0)
(2.23607--3--2--0--0)
(3.60555--2--0--0--0)

[[0 0 0 1 1],
[0 1 0 0 1],
[0 0 1 0 0],
[1 0 0 1 0],
[1 1 0 0 0]]
*/



//ok
export function calculateNumberOfCrossings(crossesNumber: Array<Array<any>>, polygons: Array<Array<lineSegment>>, points: Array<point>) {
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            let l = new lineSegment(points[i], points[j]);
            l.p = points[i];
            l.q = points[j];

            //Call numberOfCrossings, which 
            //suprise suprise counts the number of crossings
            crossesNumber[i][j] = numberOfCrossings(polygons, l);
        }
    }
    // return 0;
}

/*
sai j = 2
crossesNumber
[[0 0 0 1 1],
[0 1 0 0 1],
[0 0 1 0 0],
[1 0 0 1 0],
[1 1 0 0 0]]
*/