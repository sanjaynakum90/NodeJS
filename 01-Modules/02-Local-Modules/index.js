// const add = require("./calculate");

// es modules default file importing , you have to remember that when using es modules always add file extension in the end during local modules
import add from "./calculate.js";

// es modules multiple file importing
import { add, subtraction } from "./calculate.js";

const result = add(10, 20);
const result1 = add(100, 50);

console.log("result", result);
console.log("result1", result1);

const sub1 = subtraction(50, 25);

console.log("sub1", sub1);
