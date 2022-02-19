"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const naive_1 = require("./naive");
var numberOfSuccess = 0, numberOfFails = 0;
function testing(l1, l2, shouldCross) {
    var didCross = (0, naive_1.crosses)(l1, l2);
    if (didCross == shouldCross) {
        numberOfSuccess++;
        console.log("success");
    }
    else {
        numberOfFails++;
        console.log('Fail!!!', didCross + shouldCross);
    }
}
function main() {
    testing(new _1.lineSegment(new _1.point(0, 0), new _1.point(1, 1)), new _1.lineSegment(new _1.point(1, 1), new _1.point(1, 0)), 5);
    testing(new _1.lineSegment(new _1.point(0, 1), new _1.point(1, 1)), new _1.lineSegment(new _1.point(0, 0), new _1.point(1, 1)), 5);
    testing(new _1.lineSegment(new _1.point(0, 0), new _1.point(0, 1)), new _1.lineSegment(new _1.point(1, 1), new _1.point(1, 0)), 5);
    testing(new _1.lineSegment(new _1.point(0, 0), new _1.point(1, 0)), new _1.lineSegment(new _1.point(0, 1), new _1.point(1, 0)), 5);
    testing(new _1.lineSegment(new _1.point(0, 0), new _1.point(2, 1)), new _1.lineSegment(new _1.point(0, 2), new _1.point(4, 0)), 4);
    testing(new _1.lineSegment(new _1.point(0, 0), new _1.point(2, 1)), new _1.lineSegment(new _1.point(-1, 0), new _1.point(0, 4)), 0);
    testing(new _1.lineSegment(new _1.point(0, 0), new _1.point(1, 1)), new _1.lineSegment(new _1.point(0, 1), new _1.point(1, 0)), 4);
    testing(new _1.lineSegment(new _1.point(1, 1), new _1.point(2, 0)), new _1.lineSegment(new _1.point(1, 0), new _1.point(8, 7)), 4);
    console.log(`number of fails: ${numberOfFails} --- number of success: ${numberOfSuccess}`);
    return 0;
}
//# sourceMappingURL=crossTesting.js.map