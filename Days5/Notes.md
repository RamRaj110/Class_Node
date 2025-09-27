```````````````````````````````````````
Days 4 (Event Loop)
```````````````````````````````````````
Event Loop keep checking Callstack is Empty or not. if empty then push the async task in callstack.

Start->[Process Next Tick]->[Promis callback]->[Timer]->[Process Next Tick]->[Promis callback]->[Poll]->[Process Next Tick]->[Promis callback]->[Check]->[Process Next Tick]->[Promis callback]->[Close]->[Process Next Tick]->[Promis callback]->[Timer]

1.Timer - Done in this phase like - setTimeout, setImmediate, setInterval.
2.Poll- Done in this phase like - callback, fileRead, Crypto, http, get...
3.Check - setImmediate
4.Close - Socket on(close).

----------------------------------------------------------
How code execute?
````````````````````````````````````
First of all synchronous code is execute when call stack is empty. Then async code is execute.


----------------------------------------------------------
//code1.js

const fs = require("fs");

const a = 123;

setImmediate(() => {
    console.log("I am Immediat callback");
});

Promise.resolve(("I am promise callback")).then((res)=>{
    console.log(res);
})

fs.readFile("./Notes.md","utf-8",()=>{
    console.log("I am file callback");
})

setTimeout(()=>{
    console.log("I am timeout callback");
},0)

process.nextTick(()=>{
    console.log("I am next tick callback");
})


function b(){
    console.log("I am a",a);
}

b();
console.log("I am  the last line.");
----------------------------------------------------------
Output-

I am a 123
I am  the last line.
I am next tick callback
I am promise callback
I am timeout callback
I am Immediat callback
I am file callback //this is done in poll phase but read file take time just because it done the next loop.
----------------------------------------------------------
//code2.js

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
````````````````````
outPut -
I am  the last line.
I am promise callback
I am timeout callback
I am Immediat callback
I am file callback
I am 2nd promise callback
I am 2nd Immediat callback
I am 2nd timeout callback
````````````````````````````````````````

//code3.js

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

process.nextTick(()=>{
    process.nextTick(()=>{
        console.log("I am inside next tick callback");
    })
    console.log("I am next tick callback");
})

console.log("I am  the last line.")
````````````````````````````````````````
just because of higher priority of nexttick if nextick inside the nexttime. it run first. and then go to the timer.
output -
I am  the last line.
I am next tick callback
I am inside next tick callback
I am promise callback
I am timeout callback
I am Immediat callback
I am file callback
I am 2nd promise callback
I am 2nd Immediat callback
I am 2nd timeout callback
`````````````````````````````````````