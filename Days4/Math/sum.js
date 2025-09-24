// console.log(" I am sum file.");

let a = "I am first";

function calSum(a,b) {
   
    let sum = a + b;
    console.log(sum);
    
}

 module.exports = {calSum}; //single export

// module.exports = {
//     x: a,
//     calSum: calSum
// }// multiple export 

//module.exports = { calSum}


// export function sum(a,b){
//     let sum = a + b;
//     console.log(sum);
    
// }