`````````````````````````
DAYS 4  --Libuv--
`````````````````````````
1. Libuv is c libary used inside Nodejs.
2. It give Nodejs the ability to handle the asynchronous task(non-blocking operation).

-------------------------------------------------------
1. You run some async code like apicall, fs.readfile(),setTimeout. v8 engine send the request to our Hero Libuv.
2.Libuv put in a thread pool(background)
3.Once the task finishes, Libuv sends back the result in callstack and js execute immediatly.

 ``````````````````````````````````````````````````````
ex - 
const fs = require("fs")
const https = require("https")

console.log("Hello I am first line of async.");

var a = 324234;
var b = 5345


https.get('https://jsonplaceholder.typicode.com/todos/1',(res)=>{
    console.log("fetched the data Successfully.")
})

setTimeout(()=>{
    console.log("setTimeOut is called after 3 second.");
    
},3000);

fs.readFile("./file.txt","utf-8",(err,data)=>{
    console.log("file data: ", data);
    
})

function multi(x,y){
    const result = x*y;
    return result;
}
 console.log(multi(a,b))
 --------------------------------------------------------
 output -Hello I am first line of async.
1733030730
file data: .............
fetched the data Successfully.
setTimeOut is called after 3 second.


```````````````````````````````````````````````````````````