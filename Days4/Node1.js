// require("./Node2.js")

// const calSum = require("./sum.js") // - signle import

// const retur= require("./sum.js")

// const {calSum,x}= require("./sum.js")  // using destructuring


// import { sum } from "./Math/sum.js";

// const {multi} = require("./Math/multi.js")
// const {calSum} = require("./Math/sum.js")


const {multi,calSum} = require("./Math/allfile")
const data = require("./data.json")
console.log(data);


let a = 10;
let b = 20;

// calSum(a,b)
// console.log(x);

// console.log(retur.x);
// retur.calSum(a,b)

calSum(a,b)
multi(a,b)




console.log("Node Module System. I am the Main file. Every file atach with me.");







