`````````````````````````
Modules
`````````````````````````
CommonJs modules-old ways to import and export moduls

Moduls-collection of code. it private itself.
commonJs execute synchronous and non strict mood.

Attach file one to another using require("./path")
First Export module using-
module.exports = function name.{use exportssss. Because in frontend use export}

and import like this -
const calSum = require("./sum.js")

------------------------------------------

multiple file export and import.


module.exports = {
    x: a,
    calSum: calSum
}

const retur= require("./sum.js")

console.log(retur.x);
retur.calSum(a,b)

----------------------------------------
Esmodules - new standard
it execute asynchronous. and strict mood.

this is named export like this


export function sum(a,b){
    let sum = a + b;
    console.log(sum);
    
}
import {fnName} from "./path.js"- always use extention strictly

`````````````````````````````````````````````````````
import all file in a single file and export it. 
`````````````````````````````````````````````
