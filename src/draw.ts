import * as main from "./index"
var max_y: number =0;
var max_x: number =0;
var min_y: number =Number.MAX_VALUE;
var min_x: number =Number.MAX_VALUE;

function setMinMax(x:number, y:number){
    max_y=max_y<y?y:max_y;
    max_x=max_x<x?x:max_x;
    min_y=min_y>y?y:min_y;
    min_x=min_x>x?x:min_x;
}
// setMinMax(3,3)
// console.log(max_x,max_y,min_x,min_y)
function drawX(x: main.point){
    return x.x*10;
}
function drawY(y: main.point){
    return y.x*10;
}
// var p=new main.point(1,1);
// console.log(p.x,p.y);
// drawX(p);
// drawY(p);
// console.log(p.x,p.y);
function drawRoute(route:Array<number>,points:Array<main.point>) {
    console.log("<polyline stroke='red' stroke-width='0.2' fill='none' points='")
    var current=route.length-1;
    while(current!=-1){
        var p=points[current%points.length];
        console.log(drawX(p) + "," + drawY(p) + " ");
        current = route[current];
    }
    console.log("/>");
}

function drawPoint(p:main.point, color: string) {
    console.log( "<circle cx='" + drawX(p) + "' cy='"+ drawY(p) +"' r='0.5' fill='"+ color + "' />");
}
function drawPolygon(polygon:Array<main.lineSegment>) {
    console.log("<polygon stroke='black' stroke-width='0.1' fill='#D3D3D3'  points='");
    console.log(drawX(polygon[0].p) + "," + drawY(polygon[0].p) + " ");
    console.log(drawX(polygon[0].q) + "," + drawY(polygon[0].q) + " ");
	for(var i=1;i<polygon.length;i++){
		console.log(drawX(polygon[i].q) + "," + drawY(polygon[i].q) + " ");
	}
}
function drawPolygons(polygons:Array<Array<main.lineSegment>>) {
    for(var i=0;i<polygons.length;i++){
		drawPolygon(polygons[i]);
	}
}
function nadrawPolygonsme(polygons:Array<Array<main.lineSegment>>) {
    for(var i=0;i<polygons.length;i++){
		drawPolygon(polygons[i]);
	}
}
function drawTitle(testTitle:string, distance: number) {
    var output="<text x='0' y='";
    output+=(-10*max_y-5);
    output+="' font-family='Verdana' font-size='5'>";
    output+=testTitle;
    output+=", length: " ;
    output+=distance;
    output+="</text>";
    console.log(output);
}
function drawGraph(graph:Array<Array<number>>, points: Array<main.point>) {
    var plane_start=((points.length*main.config.printLevel)/points.length)*points.length;
    var plane_end   = plane_start+points.length;
    for(var i=plane_start;i<plane_end;i++){
		for(var j=0;j<graph[i].length;j++){
			var from=points[i%points.length], to=points[graph[i][j]%points.length];
		console.log( "<line x1='" + drawX(from) + "' y1='"+ drawY(from)+"' x2='"+drawX(to)+"' y2='"+drawY(to)+"' stroke-width='0.1' stroke='blue'/>");
		}
	}
}

function draw(testTitle:string, start:main.point, end:main.point, polygons:Array<Array<main.lineSegment>> , distance:number, points:Array<main.point>, route:Array<number>, graph:Array<Array<number>>) {
    console.log("<?xml version='1.0' encoding='UTF-8' ?>");
    console.log("<svg viewBox='"+(10*min_x-5)+" "+(-10*max_y-15)+" "+((Math.abs(min_x)+Math.abs(max_x))*10+10)+" "+ ((Math.abs(min_y)+Math.abs(max_y))*10+20)+"' xmlns='http://www.w3.org/2000/svg' version='1.1'>");
    drawPolygons(polygons);
    drawPoint(start,"#FFA500");
    drawPoint(end,"green");
    drawTitle(testTitle,distance);
    drawGraph(graph,points);
    if(distance!=-1 && main.config.drawRoute) drawRoute(route,points);
    console.log("</svg>");
}