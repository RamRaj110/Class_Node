const express = require('express');
const connectDb = require('./src/config/database');
const User = require('./src/modules/user');

const app = express();
app.use(express.json())

app.post('/signup',async(req ,res)=>{

  const user = new User(req.body);
//handle error
try{
   await user.save();
  res.send("User created successfully.")
}catch(err){
  res.status(400).send("Error creating user.")
}
 
})

app.get('/feed',async(req,res)=>{
  try{
    const users = await User.find({});
    res.send(users)
  }catch(err){
    res.status(500).send("Error fetching users.")
  }
})


app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  try{
       await User.findByIdAndDelete(userId)
res.send('user delete succefully...')
  }catch(err){
   res.status(400).send("user not deleted try again.")
  }
})

app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params?.userId;
  const data = req.body
  try {
    const allow_update = [ 'firstName','lastName','email','password','age','gender','skills','about','profileImg'];
   const isUpdate = Object.keys(data).every((keys)=>{
    return  allow_update.includes(keys)
   })
   if(!isUpdate){
    throw new Error('invalid update')
   }
   if(data.skills && data.skills.length > 5){
    throw new Error('you can add max 5 skills')
   }
    const update = await User.findByIdAndUpdate(userId , data,{runValidators:true})
    // console.log(update)
    res.send('user update successfully...')
  } catch (error) {
    res.status(400).send('user is not update....something is wrong.')
  }
})

connectDb().then(()=>{
  console.log('Database connected sucessfully.')
app.listen(3000, () => {
  console.log('Server is running on port 3000');    
});
}).catch((err)=>{
    console.log(err)
})



