
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