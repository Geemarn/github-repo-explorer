"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var react_1 = require("@testing-library/react");
require("@testing-library/jest-dom/vitest");
// runs a clean after each test case (e.g. clearing jsdom)
(0, vitest_1.afterEach)(function () {
    (0, react_1.cleanup)();
});
