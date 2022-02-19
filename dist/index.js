"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.config = exports.Config = exports.lineSegment = exports.point = void 0;
// import  native from "./naive";
const draw_1 = require("./draw");
const naive_1 = require("./naive");
//point type for holding a coordinate 
class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        (0, draw_1.setMinMax)(x, y);
    }
    compare(other) {
        return this.x == other.x && this.y == other.y;
    }
}
exports.point = point;
//linesegment type holding two points
class lineSegment {
    constructor(p, q) {
        this.p = p;
        this.q = q;
    }
    compare(other) {
        return (this.p.compare(other.p) && this.q.compare(other.q))
            || (this.p.compare(other.q) && this.q.compare(other.p));
    }
}
exports.lineSegment = lineSegment;
class Config {
    constructor() {
        this.printGraph = false;
        this.drawRoute = true;
        this.printLevel = 0;
        this.k = 0;
    }
}
exports.Config = Config;
exports.config = new Config();
function setConfig(argc, argv) {
    for (var i = 1; i < argc; i++) {
        var s = argv[i];
        if (s == ("-k")) {
            exports.config.k = Number(argv[i + 1]);
        }
        if (s == ("-p")) {
            exports.config.printGraph = true;
            if (argc - 1 > i) {
                var temp = argv[i + 1];
                var index = temp.search(/\D/);
                if (index != -1) {
                    exports.config.printLevel = Number(temp[index]);
                }
            }
        }
    }
}
exports.setConfig = setConfig;
function getTime(start, end) {
    return (end.getDate() - start.getDate());
}
function CreateArrayWithRows(size) {
    var x = new Array(size);
    for (var i = 0; i < size; i++) {
        x[i] = new Array();
    }
    return x;
}
function createArrayWithRowAndColumm(size) {
    var x = new Array(size);
    for (var i = 0; i < size; i++) {
        x[i] = new Array(size);
    }
    return x;
}
function main(argc, argv) {
    // var max_x: number =0, max_y: number =0, min_x: number =0, min_y: number =0;
    setConfig(argc, argv);
    let start, end, testTitle;
    //Create vector for containing the linesegments of the polygons
    let polygons;
    //Create vector for containing the points of the polygons
    let points;
    //Call function that parses the file input
    (0, naive_1.readInput)(start, end, testTitle, polygons, points);
    //Get how many points we have
    let numberOfPoints = points.length;
    //Create a two dimenstional vector for the graph
    let dimension = numberOfPoints * (exports.config.k + 1);
    var graph = CreateArrayWithRows(dimension);
    let graphDistance = CreateArrayWithRows(dimension);
    //Vector so we can backtrack the route
    let route;
    let crossesNumber = createArrayWithRowAndColumm(points.length);
    let time1 = new Date();
    (0, naive_1.calculateNumberOfCrossings)(crossesNumber, polygons, points);
    let time2 = new Date();
    (0, naive_1.makeVisabilityGraph)(graph, graphDistance, crossesNumber, points);
    let time3 = new Date();
    let distance = (0, naive_1.dijkstra)(graphDistance, graph, route);
    let time4 = new Date();
    if (exports.config.printGraph) {
        (0, draw_1.draw)(testTitle, start, end, polygons, distance, points, route, graph);
    }
    else {
        console.log(getTime(time1, time2) + "-" + getTime(time2, time3) + "-" + getTime(time3, time4) + "-" + distance);
    }
}
main(1, ["a", "b", "c"]);
//# sourceMappingURL=index.js.map