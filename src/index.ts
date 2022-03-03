
// import  native from "./naive";
import { draw, setMinMax } from "./draw";
import { calculateNumberOfCrossings, makeVisabilityGraph, dijkstra, readInput } from "./naive";
import * as fs from 'fs';
import path from 'path';
//point type for holding a coordinate 
export class point {
    x: number;
    y: number;
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        setMinMax(x, y)
    }
    compare(other: point) {
        return this.x == other.x && this.y == other.y;
    }
}

//linesegment type holding two points
export class lineSegment {
    p: point;
    q: point;
    static p: point;
    static q: point;
    public constructor(p: point, q: point) {
        this.p = p;
        this.q = q;
    }

    compare(other: lineSegment) {
        return (this.p.compare(other.p) && this.q.compare(other.q))
            || (this.p.compare(other.q) && this.q.compare(other.p))
    }
}

export class Config {
    printGraph: boolean = false;
    drawRoute: boolean = true;
    printLevel: number = 0;
    k: number = 0;
    public constructor() {

    }
}

export var config = new Config();

export function setConfig(argc: number, argv: string[]) {
    for (var i = 1; i < argc; i++) {
        var s = argv[i];
        if (s == ("-k")) {
            config.k = Number([i + 1]);
        }
        if (s == ("-p")) {
            config.printGraph = true;
            if (argc - 1 > i) {
                var temp = argv[i + 1];
                var index = temp.search(/\D/);
                if (index != -1) {
                    config.printLevel = Number(temp[index]);
                }
            }
        }
    }
}

function getTime(start: Date, end: Date) {
    return (end.getDate() - start.getDate());
}

function CreateArrayWithRows(size: number) {
    var x = new Array(size);
    for (var i = 0; i < size; i++) {
        x[i] = new Array();
    }
    return x;
}

async function main(argc: number, argv: string[]) {
    setConfig(argc, argv);
    const conf = path.join(__dirname, argv[2])

    let start: point, end: point, testTitle: string
    //Create vector for containing the linesegments of the polygons
    let polygons: lineSegment[][] = [[]];

    //Create vector for containing the points of the polygons
    let points: Array<point> = [];
    let readFile = fs.readFileSync(conf, 'utf-8')

    //Call function that parses the file input
    let obj = await readInput(start, end, testTitle, polygons, points, readFile);

    //Get how many points we have
    let numberOfPoints = obj.points.length;

    //Create a two dimenstional vector for the graph
    let dimension = numberOfPoints * (config.k + 1);
    var graph = CreateArrayWithRows(dimension);
    let graphDistance = CreateArrayWithRows(dimension);

    //Vector so we can backtrack the route
    let route: Array<number> = new Array();
    let crossesNumber = CreateArrayWithRows(obj.points.length)

    let time1 = new Date();
    //Call function that calculate the distance
    calculateNumberOfCrossings(crossesNumber, obj.polygons, obj.points);

    let time2 = new Date();
    makeVisabilityGraph(graph, graphDistance, crossesNumber, obj.points);

    let time3 = new Date();
    //The graph is constructed call dijksta to calculate the distance
    let distance: number = dijkstra(graphDistance, graph, route);

    let time4 = new Date();
    //Output the distance
    if (config.printGraph) {
        draw(obj.testTitle, obj.start, obj.end, obj.polygons, distance, obj.points, route, graph);
    } else {
        console.log(getTime(time1, time2) + "-" + getTime(time2, time3) + "-" + getTime(time3, time4) + "-" + distance);
    }
}

process.argv.slice(2)
main(process.argv.length, process.argv)

