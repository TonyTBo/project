import { lineSegment, point } from ".";

function toString_point(p: point){

}

function toString_lineSegment(l: lineSegment){

}

function readPoint(){
    var x!: number;
    var y!: number;
    console.log(`x: ${x} -- y: ${y}`);
    var p = new point(x,y);
    return p;
}

function readInput(start: point, end: point, testTitle: string, polygons: Array<Array<lineSegment>>, points: Array<point>){

    start = readPoint();
    end = readPoint();
    points.push(start);

    var numberOfPolygons: number;

}

function dist(p: point, q: point){
    return Math.sqrt(Math.pow(p.x - q.x, 2.0) + Math.pow(p.y - q.y, 2.0));
}

function rightTurn(p1: point, p2: point, p3: point){
    return (p1.y - p2.y)*(p2.x - p3.x) - (p2.y - p3.y)*(p1.x - p2.x);
}

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

function numberOfCrossings(polygons: Array<Array<lineSegment>>, l: lineSegment){
    let n: number = 0;
    for(let i: number = 0; i < polygons.length; i++){
        let numberOfVaolation: number = 0;
        for(let j: number = 0; j < polygons[i].length; j++){
            let result: number = crosses(l, polygons[i][j]);
            if(result == -1){
                return 0;
            } else if(result == 10){
                numberOfVaolation = 10;
            } else {
                numberOfVaolation += result;
            }
        }
        if( numberOfVaolation > 2){
            n++;
        }
    } return n;
}

export function dijkstra(graphDistance: Array<Array<number>>, graph: Array<Array<number>>, route: Array<number>){
    let start = 0;
    let end = graph.length - 1;

    route.reverse(graph.length);

    return -1;


}


export function calculateNumberOfCrossings(crossesNumber: Array<Array<number>>, polygons: Array<Array<lineSegment>>, points: Array<point>){
    crossesNumber.reverse(points.length, Array<number>);
    for(let i: number = 0;i < points.length; i++ ){
        for(let j: number = 0; j < points.length; j++){
            var l!: lineSegment;
            l.p = points[i];
            l.q = points[j];

            crossesNumber[i][j] = numberOfCrossings(polygons, l);
        }

    }
}

export function makeVisabilityGraph(graph: Array<Array<number>>, graphDistance: Array<Array<number>>, crossesNumber: Array<Array<number>>, points: Array<point>){
    let numberOfPoints = points.length;

    for(let i: number = 0; i < graph.length; i++){
        for(let j: number = 0; j < numberOfPoints; j++){
            let from = i;
            let from_point_index = from % numberOfPoints;
            let to_point_index = j;
            let to = (i/numberOfPoints)*numberOfPoints + crossesNumber[from_point_index][j]*numberOfPoints + j;

            if(graph.length > to){
                let distance = dist(points[from_point_index], points[to_point_index]);
                graphDistance[from].push(distance);
                graph[from].push(to);
            }
        }
    }
    return 0;
}