console.log("i am first.")
var a =30923;
var b=320392;

//when this call when v8 engine empty the call stack then push this and execute.
setTimeout(() => {
    console.log("I am first timeout. call ASAP.")
}, 0);

setTimeout(() => {
    console.log("i am second timeout. after 2sec.")
}, 2000);

function multi(x,y){
    return x*y;
}

console.log(multi(a,b))