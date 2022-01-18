
// import  native from "./naive";
import { draw } from "./draw";
import { calculateNumberOfCrossings, makeVisabilityGraph, dijkstra } from "./naive";


export class point{
    x:number;
    y:number;
    public constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
    compare(other:point) {
        return this.x==other.x && this.y==other.y;
    }
}

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

export var config=new Config();

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
                    config.printLevel=Number(temp[index]);
                }
			}
		}
    }
}



export function main(argc:number,argv:string[]) {
    var max_x: number =0;
    var max_y: number =0;
    var min_x: number =0;
    var min_y: number =0;

    setConfig(argc, argv);

    var start!: point;
    var end!: point;
    var testTitle!: string;

    var polygons!:Array<Array<lineSegment>>;
    var points!: Array<point>;

    // readInput(start, end, testTitle, polygons, polygons);
    
    var graph!: Array<Array<number>>;
    var graphDistance!: Array<Array<number>>;

    var route!: Array<number>;
    var crossesNumber!: Array<Array<number>>;

    var numberOfPoints = points.length;
    var dimension: number = numberOfPoints*(config.k + 1);
    // graph.reverse(dimension, Array<number>());
    // graphDistance.reverse(dimension, Array<number>());

    var time1 = new Date();
    calculateNumberOfCrossings(crossesNumber, polygons, points);

    var time2 = new Date();
    makeVisabilityGraph(graph, graphDistance, crossesNumber, points);

    var time3 = new Date();

    var distance: number = dijkstra(graphDistance, graph, route);

    var time4 = new Date();

    if(config.printGraph){
        draw(testTitle, start, end, polygons, distance, points, route, graph);
    } else {
        console.log(distance);
    }



}