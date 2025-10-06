
const fs = require("fs");



setImmediate(() => {
    console.log("I am Immediat callback 1");
});

fs.readFile("./Notes.md","utf-8",()=>{
    setImmediate(() => {
    console.log("I am 2nd Immediat callback 2");
});
setTimeout(()=>{
    console.log("I am 2nd timeout callback 3");
},0)

Promise.resolve(("I am 2nd promise callback 4")).then((res)=>{
    console.log(res);
})
    console.log("I am 2nd promise next line callback 5");
})

setTimeout(()=>{
    console.log("I am timeout callback 6");
},0)

Promise.resolve(("I am promise callback 7")).then((res)=>{
    console.log(res);
})


console.log("I am  the last line. 8")