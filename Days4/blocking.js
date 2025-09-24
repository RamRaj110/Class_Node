const crypto = require('crypto');

console.log("first line ");

var a = 232345;
var b = 34343;


crypto.pbkdf2Sync("password",'salt',50000,50,'sha512')//this is main blocking thread. Because this is perform in synchrounous way first it resolve and the move to the next line.
console.log("first key")

crypto.pbkdf2("password",'salt',50000,50,'sha512',(err,key)=>{
    console.log("second key ")
})//this non-blocking thread.Because it add to the libuv to perform when resolve it its callback.

function multiply(x,y){
    const result = x*y;
    return result;
}
console.log(multiply(a,b))

