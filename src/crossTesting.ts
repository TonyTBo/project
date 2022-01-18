import { lineSegment, point,  } from ".";
import { crosses } from "./naive";

var numberOfSuccess: number = 0;
var numberOfFails: number = 0;

function testing(l1: lineSegment, l2: lineSegment, shouldCross: number): void {
    var didCross = crosses(l1, l2);
    if(didCross == shouldCross){
        numberOfSuccess ++;
        console.log("success");
    }else {
        numberOfFails ++;
        console.log('Fail!!!', didCross +  shouldCross);
    }
}

function main(){
    testing(new lineSegment(new point(0, 0), new point(1, 1)), new lineSegment(new point(1, 1), new point(1, 0)), 5);
    testing(new lineSegment(new point(0, 1), new point(1, 1)), new lineSegment(new point(0, 0), new point(1, 1)), 5);
    testing(new lineSegment(new point(0, 0), new point(0, 1)), new lineSegment(new point(1, 1), new point(1, 0)), 5);
    testing(new lineSegment(new point(0, 0), new point(1, 0)), new lineSegment(new point(0, 1), new point(1, 0)), 5);

    testing(new lineSegment(new point(0, 0), new point(2, 1)), new lineSegment(new point(0, 2), new point(4, 0)), 4);
    testing(new lineSegment(new point(0, 0), new point(2, 1)), new lineSegment(new point(-1, 0), new point(0, 4)), 0);

    testing(new lineSegment(new point(0, 0), new point(1, 1)), new lineSegment(new point(0, 1), new point(1, 0)), 4);
    testing(new lineSegment(new point(1, 1), new point(2, 0)), new lineSegment(new point(1, 0), new point(8, 7)), 4);

    console.log(`number of fails: ${numberOfFails} --- number of success: ${numberOfSuccess}`)    
}