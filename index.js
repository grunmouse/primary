const force = require('./force.js');
const wheel = require('./wheel.js');

let prim = force(10);

let next = wheel(2,100, prim);

console.log(next);