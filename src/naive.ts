import { lineSegment, point } from ".";

//ok
function readPoint(){
    let x!: number, y!: number;
    console.log(`x: ${x} -- y: ${y}`);
    let p = new point(x,y);
    return p;
}

export function readInput(start: point, end: point, testTitle: string, polygons: Array<Array<lineSegment>>, points: Array<point>){
    //Read start and end points
    start = readPoint();
    end = readPoint();
    points.push(start);

    var numberOfPolygons!: number; // not yet

    //Iterate through the polygons
    for(let i = 0; i < numberOfPolygons; i++){
        let numberOfSides!: number;

        //Get the first point and remember it 
		//so we can make the last linesegment after the loop
        let firstPoint: point = readPoint();

        //Create a variable for the last point we saw
        let lastPoint: point = firstPoint;

        //Add the first point
        points.push(firstPoint);

        for(let j = 0; j < numberOfSides; j++){
            //Get the next point
            let currentPoint = readPoint();

            //Add point to list of points
            points.push(currentPoint);

            //create linesegment
            let l!: lineSegment;

            //Set the linesegment
            l.p = lastPoint;
            l.q = currentPoint;

            //push it to the list of linesegments
            polygons[i].push(l);

            //and update the lastPoint
            lastPoint = currentPoint;

        }

        //Construct the missing linesegment
        let l!: lineSegment;
        l.p = lastPoint;
        l.q = firstPoint;

        //and push it to the vector
        polygons[i].push(l);

    }
    points.push(end);
}

//ok
//Function for calculating the distance between two points
function dist(p: point, q: point): number{
    //calculate euclidean distance sqrt( (p.x-q.x)^2+(p.y-q.y)^2 )
    return Math.sqrt(Math.pow(p.x - q.x, 2.0) + Math.pow(p.y - q.y, 2.0));
}

//ok
function rightTurn(p1: point, p2: point, p3: point): number{
    return (p1.y - p2.y)*(p2.x - p3.x) - (p2.y - p3.y)*(p1.x - p2.x);
}

//ok
export function crosses(l1: lineSegment, l2: lineSegment){
    if (l1 == l2) return -1;
    let returnValue: number = 0;
    if(l1.p == l2.p) returnValue++;
    if(l1.p == l2.q) returnValue++;
    if(l1.q == l2.p) returnValue++;
    if(l1.q == l2.q) returnValue++;

    if(returnValue > 0) return returnValue;
    let rt_1 = rightTurn(l1.p, l1.q, l2.p);
    let rt_2 = rightTurn(l1.p, l1.q, l2.q);
    let rt_3 = rightTurn(l2.p, l2.q, l1.p);
    let rt_4 = rightTurn(l2.p, l2.q, l1.q);

    let r1 = rt_1*rt_2;
    let r2 = rt_3*rt_4;

    if((r1 == 0 && r2 <= 0) || (r2 == 0 && r1 <= 0)){
        returnValue = 10;
    }
    if((r1 <= 0) && (r2 <= 0)){
        returnValue = 10
    }
    return returnValue;
}

//ok
//Takes a line segment and returns the number of polygon edges it crosses
function numberOfCrossings(polygons: Array<Array<lineSegment>>, l: lineSegment){
    let n: number = 0;
    for(let i: number = 0; i < polygons.length; i++){
        let numberOfVaolation: number = 0;
        for(let j: number = 0; j < polygons[i].length; j++){
            let result: number = crosses(l, polygons[i][j]);
            if(result == -1){
                return 0;
            } 
            else if(result == 10){
                numberOfVaolation = 10;
            } 
            else {
                numberOfVaolation += result;
            }
        }
        if( numberOfVaolation > 2){
            n++;
        }
    } return n;
}

interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    top(): T | undefined;
  }

class Stack<T> implements IStack<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    pop(): T | undefined {
      return this.storage.pop();
    }

    top(): T | undefined {
        return this.storage[0];
      }
  
    peek(): T | undefined {
      return this.storage[this.size() - 1];
    }
  
    size(): number {
      return this.storage.length;
    }
  }

//Implementation of dijkstra
//Takes a graph and a start and end point in the graph
//returns the distance
export function dijkstra(graphDistance: Array<Array<number>>, graph: Array<Array<number>>, route: Array<number>){
    var start = 0, end = graph.length - 1;

    // route.reverse(graph.length);

    var visited!: Array<Boolean>;
   
    const pq = new Stack();
    // var pq!: Array<tuple: [number, number, number]>;

    var tuple: [number, number, number] = [0, start, -1];
    pq.push(tuple);

    while(pq.size() != 0){
        let t : [number, number, number] = tuple;

        pq.pop();

        let distanceSoFar = -1*t[0];
        let current: number = t[1];
        let whereFrom: number = t[2];
        if(visited[current]) continue;

        route[current] = whereFrom;
        if(current == end) return distanceSoFar;

        visited[current] = true;
        for(let i = 0; i < graph[current].length; i++){
            let next = graph[current][i];
            if(visited[next]) continue;

            let newdistance = distanceSoFar + graphDistance[current][i];
            let newTuple: [number, number, number] = [-1*newdistance, next, current];

            pq.push(newTuple);
        }
    }
    return -1;
}

//ok
export function makeVisabilityGraph(graph: Array<Array<number>>, graphDistance: Array<Array<number>>, crossesNumber: Array<Array<number>>, points: Array<point>){
    //Get how many points we have
    let numberOfPoints = points.length;

    //Go through all pairs of points and calculate the distance
    for(let i: number = 0; i < graph.length; i++){
        for(let j: number = 0; j < numberOfPoints; j++){
            let from = i;

            let from_point_index = from % numberOfPoints;

            let to_point_index = j;

            let to = (i/numberOfPoints) * numberOfPoints + crossesNumber[from_point_index][j]*numberOfPoints + j;

            //If it is the same point don't make an edge
            if(graph.length > to){
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
export function calculateNumberOfCrossings(crossesNumber: Array<Array<number>>, polygons: Array<Array<lineSegment>>, points: Array<point>){
    for(let i: number = 0;i < points.length; i++ ){
        for(let j: number = 0; j < points.length; j++){
            let l!: lineSegment;
            l.p = points[i];
            l.q = points[j];

            //Call numberOfCrossings, which 
			//suprise suprise counts the number of crossings
            crossesNumber[i][j] = numberOfCrossings(polygons, l);
        }
    }
    return 0;
}