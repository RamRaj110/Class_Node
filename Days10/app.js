const express = require('express');
// const {adminAuth,userAuth} = require('./modules/auth');

// const app = express();
// app.use("/admin",adminAuth);

// app.get("/admin/alldata",(req,res,next)=>{
//   console.log("admin all data");
//   res.send("admin all data");
// })
// // app.use("/user",userAuth);
// app.get("/user",userAuth,(req,res,next)=>{
//   console.log("user1");
//   res.send("user1 data");
// })

// ----error handling-----


const app = express();


app.get("/getuser",(req,res,next)=>{
  try{
    throw new Error("user error");
    res.send("user data");
  }catch(err){
    res.status(500).send(err.message);
  }
})

app.get('/',(req,res,next)=>{
  throw new Error("some error");
  res.send("home page");
})


app.listen(3000,()=>{
  console.log("server started at port 3000...");
})