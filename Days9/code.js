const express = require('express');

const app = express();

app.use("/",(req,res)=>{
 res.send("helo world")
})

app.use("/ok",(req,res)=>{
 res.send("ok route")
})

app.listen(3000,()=>{
  console.log("server started at port 3000...");
})