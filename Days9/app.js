const express = require('express');

const app = express();


// app.get("/user",(req,res)=>{
//   res.send({name:"john",age:30})
// })

// app.post("/user",(req,res)=>{
//   res.send('user data saved')
// })

// app.delete("/user",(req,res)=>{
//   res.send('user deleted')
// })


app.get("/user/:userId",(req,res)=>{
  console.log(req.params);
})

app.use("/",(req,res)=>{
 res.send("helo from server")
})



app.listen(3000,()=>{
  console.log("server started at port 3000...");
})