
// import  native from "./naive";
import { draw, setMinMax } from "./draw";
import { calculateNumberOfCrossings, makeVisabilityGraph, dijkstra, readInput } from "./naive";

//point type for holding a coordinate 
export class point{
    x:number;
    y:number;
    public constructor(x:number,y:number){
        this.x=x;
        this.y=y;
        setMinMax(x, y)
    }
    compare(other:point) {
        return this.x==other.x && this.y==other.y;
    }
}

//linesegment type holding two points
export class lineSegment{
    p:point;
    q:point;
    public constructor (p:point,q:point){
        this.p=p;
        this.q=q;
    }
    compare(other:lineSegment) {
        return (this.p.compare(other.p)&&this.q.compare(other.q))
        ||(this.p.compare(other.q)&&this.q.compare(other.p))
    }
}

export class Config{
    printGraph : boolean=false;
    drawRoute : boolean=true;
    printLevel : number= 0;
    k : number = 0;
    public constructor(){

    }
}

export var config = new Config();

export function setConfig(argc:number,argv:string[]) {
    for(var i = 1 ; i < argc ; i++ ){
        var s = argv[i];
        if(s==("-k")){
			config.k = Number(argv[i+1]);
		}
        if(s==("-p")){
			config.printGraph = true;
			if(argc-1>i){
				var temp=argv[i+1];
                var index=temp.search(/\D/);
                if(index!=-1){
                    config.printLevel= Number(temp);
                }
			}
		}
    }
}

function getTime(start: Date, end: Date){
    return (end.getDate() - start.getDate());
}

function CreateArrayWithRows(size: number) {
    var x = new Array(size);
    for (var i = 0; i < size; i++) {
    x[i] = new Array();
    }
    return x;
}

// function CreatArray(){
//     return new Array()
// }

// function createArrayWithRowAndColumm(size: number) {
//     var x = new Array(size);
//     for (var i = 0; i < size; i++) {
//     x[i] = new Array(size);
//     }
//     return x;
// }

function main(argc:number, argv:string[]) {
    // var max_x: number =0, max_y: number =0, min_x: number =0, min_y: number =0;

    setConfig(argc, argv);

    let start!: point, end!: point, testTitle!: string

    //Create vector for containing the linesegments of the polygons
    let polygons!:Array<Array<lineSegment>>
    
    //Create vector for containing the points of the polygons
    let points!: Array<point>;

    //Call function that parses the file input
    readInput(start, end, testTitle, polygons, points);

    //Get how many points we have
    let numberOfPoints = points.length;

    //Create a two dimenstional vector for the graph
    let dimension = numberOfPoints*(config.k+1);
    var graph = CreateArrayWithRows(dimension);
    let graphDistance = CreateArrayWithRows(dimension)

    //Vector so we can backtrack the route
    let route: Array<number> = new Array();
    let crossesNumber = CreateArrayWithRows(points.length)

    let time1 = new Date();
    //Call function that calculate the distance
    calculateNumberOfCrossings(crossesNumber, polygons, points);

    let time2 = new Date();
    makeVisabilityGraph(graph, graphDistance, crossesNumber, points);

    let time3 = new Date();
    //The graph is constructed call dijksta to calculate the distance
    let distance: number = dijkstra(graphDistance, graph, route);

    let time4 = new Date();
    //Output the distance
    if(config.printGraph){
        draw(testTitle, start, end, polygons, distance, points, route, graph);
    } else {
        console.log(getTime(time1, time2) + "-" + getTime(time2, time3) + "-" + getTime(time3, time4) + "-" + distance);
    }
}

