const fs = require("fs");

const a = 123;

setImmediate(() => {
    console.log("I am Immediat callback");
});

fs.readFile("./Notes.md","utf-8",()=>{
    console.log("I am file callback");
})

setTimeout(()=>{
    console.log("I am timeout callback");
},0)

function b(){
    console.log("I am a",a);
}

b();
console.log("I am  the last line.")