
Dev Tinder
--------------------------------------------------------------------------------

`````````````````````````````````````````````````````````````````````````````````
1.Create server (app.js) -> create database(databse.js) connect to database.
connect database before start server.

connectDb().then(()=>{
  console.log('Database connected sucessfully.')
app.listen(3000, () => {
  console.log('Server is running on port 3000');    
});
}).catch((err)=>{
    console.log(err)
})
``````````````````````````````````````````````````````````````````````````````````````

```````````````````````````````````````````````````````````````````````````````````````
2.Define Schema (user.js)

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
--------------------------------------------------------------------------------------
3.Define api and sava data in database.(get,post,patch,delete)

app.use(express.json())
 //when we are pass the data in json format. its conver into object and pass the data.
 // this middleware call every api hit.

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

app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  const data = req.body
  try {
    const update = await User.findByIdAndUpdate(userId , data)
    // console.log(update)
    res.send('user update successfully...')
  } catch (error) {
    res.status(400).send('user is not update....something is wrong.')
  }
})
```````````````````````````````````````````````````````````````````````````````````````
4.api level validation

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
```````````````````````````````````````````````````````````````````````````````````````
