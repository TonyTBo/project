"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = exports.setMinMax = void 0;
const _1 = require(".");
var max_y = 0;
var max_x = 0;
var min_y = Number.MAX_VALUE;
var min_x = Number.MAX_VALUE;
function setMinMax(x, y) {
    max_y = max_y < y ? y : max_y;
    max_x = max_x < x ? x : max_x;
    min_y = min_y > y ? y : min_y;
    min_x = min_x > x ? x : min_x;
}
exports.setMinMax = setMinMax;
// setMinMax(3,3)
// console.log(max_x,max_y,min_x,min_y)
function drawX(x) {
    return x.x * 10;
}
function drawY(y) {
    return y.x * 10;
}
// var p=new point(1,1);
// console.log(p.x,p.y);
// drawX(p);
// drawY(p);
// console.log(p.x,p.y);
function drawRoute(route, points) {
    console.log("<polyline stroke='red' stroke-width='0.2' fill='none' points='");
    var current = route.length - 1;
    while (current != -1) {
        var p = points[current % points.length];
        console.log(drawX(p) + "," + drawY(p) + " ");
        current = route[current];
    }
    console.log("/>");
}
function drawPoint(p, color) {
    console.log("<circle cx='" + drawX(p) + "' cy='" + drawY(p) + "' r='0.5' fill='" + color + "' />");
}
function drawPolygon(polygon) {
    console.log("<polygon stroke='black' stroke-width='0.1' fill='#D3D3D3'  points='");
    console.log(drawX(polygon[0].p) + "," + drawY(polygon[0].p) + " ");
    console.log(drawX(polygon[0].q) + "," + drawY(polygon[0].q) + " ");
    for (var i = 1; i < polygon.length; i++) {
        console.log(drawX(polygon[i].q) + "," + drawY(polygon[i].q) + " ");
    }
}
function drawPolygons(polygons) {
    for (var i = 0; i < polygons.length; i++) {
        drawPolygon(polygons[i]);
    }
}
// function nadrawPolygonsme(polygons:Array<Array<lineSegment>>) {
//     for(var i=0;i<polygons.length;i++){
// 		drawPolygon(polygons[i]);
// 	}
// }
function drawTitle(testTitle, distance) {
    var output = "<text x='0' y='";
    output += (-10 * max_y - 5);
    output += "' font-family='Verdana' font-size='5'>";
    output += testTitle;
    output += ", length: ";
    output += distance;
    output += "</text>";
    console.log(output);
}
function drawGraph(graph, points) {
    var plane_start = ((points.length * _1.config.printLevel) / points.length) * points.length;
    var plane_end = plane_start + points.length;
    for (var i = plane_start; i < plane_end; i++) {
        for (var j = 0; j < graph[i].length; j++) {
            var from = points[i % points.length], to = points[graph[i][j] % points.length];
            console.log("<line x1='" + drawX(from) + "' y1='" + drawY(from) + "' x2='" + drawX(to) + "' y2='" + drawY(to) + "' stroke-width='0.1' stroke='blue'/>");
        }
    }
}
function draw(testTitle, start, end, polygons, distance, points, route, graph) {
    console.log("<?xml version='1.0' encoding='UTF-8' ?>");
    console.log("<svg viewBox='" + (10 * min_x - 5) + " " + (-10 * max_y - 15) + " " + ((Math.abs(min_x) + Math.abs(max_x)) * 10 + 10) + " " + ((Math.abs(min_y) + Math.abs(max_y)) * 10 + 20) + "' xmlns='http://www.w3.org/2000/svg' version='1.1'>");
    drawPolygons(polygons);
    drawPoint(start, "#FFA500");
    drawPoint(end, "green");
    drawTitle(testTitle, distance);
    drawGraph(graph, points);
    if (distance != -1 && _1.config.drawRoute)
        drawRoute(route, points);
    console.log("</svg>");
}
exports.draw = draw;
//# sourceMappingURL=draw.js.map