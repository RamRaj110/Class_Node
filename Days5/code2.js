
const fs = require("fs");



setImmediate(() => {
    console.log("I am Immediat callback");
});

fs.readFile("./Notes.md","utf-8",()=>{
    setImmediate(() => {
    console.log("I am 2nd Immediat callback");
});
setTimeout(()=>{
    console.log("I am 2nd timeout callback");
},0)

Promise.resolve(("I am 2nd promise callback")).then((res)=>{
    console.log(res);
})
    console.log("I am file callback");
})

setTimeout(()=>{
    console.log("I am timeout callback");
},0)

Promise.resolve(("I am promise callback")).then((res)=>{
    console.log(res);
})


console.log("I am  the last line.")