
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

````````````````````````````````````````````````````````````````````````````````
5.npm i validator - (see docs) 
set schema level validation and api lavel validation

const validator = require("validator");
 email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email"+value)
      }
    }
````````````````````````````````````````````````````````````````````````````````````````
6.in utils folder- userValidation.js validate in seperate file
const validate = require("validator");

const userValidation = (req)=>{
const {firstName,lastName,email,password} = req.body
if(!firstName || !lastName ){
    throw new Error("first name and last name is required");
}else if(!validate.isStrongPassword(password)){
    throw new Error("password is not strong");
}else if(!validate.isEmail(email)){
    throw new Error("email is not valid");
}
}

module.exports = userValidation

````````````````````````````````````````````````````````````````````````````````````
7.password encryption (bycrypt)

npm i bcrypt
---------------------------------

 try{
  userValidation(req)
  const {firstName,lastName,email,gender,password} = req.body
  const hashPassword  = await bcrypt.hash(password,10);
  console.log(hashPassword)
 
  // const user = new User(req.body);
  const user = new User({
   firstName,
   lastName,
   email,
   gender,
   password:hashPassword
  })

`````````````````````````````````````````````````````````````````````
8.Login api
app.post('/login',async(req,res)=>{
  try{
    const {email,password}= req.body
    const user = await User.findOne({email});
    if(!user){
      throw new Error('Invalid Credentials...')
    }else{
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        throw new Error('Invalid Credentials...')
      }else{
        res.send('user login successfully...')
      }
    }
  }catch(err){
    res.status(400).send("Error:"+err.message)
  }
})
``````````````````````````````````````````````````````````````````````
Token - when we login successfully server generate a token(jwt-json web token)  send back to the user and browser is store to the token.
Everytime when call api. the browser send cookies with token. server match to the token if validate then send back to response. like after login successfull. when update ur profile at time server match the token and send profile detail.

for read token use- app.use(cookieParser())


for token user jwt token - npm i jsonwebtoken-

 const token = await jwt.sign({_id : user._id},'Pawan@Dev')-hide user id and a secrete key.
        // res.cookie('token','asdddfjofosd')
        console.log(token)
        res.cookie("token",token)

when create token user id is hidden in token.
after that verify the token with secrete key. extract user id from token.

 const cookies = req.cookies
    console.log(cookies);
    const {token}= cookies

    const userId = await jwt.verify(token,'Pawan@Dev')
    const {_id} = userId;
    console.log('loged in user id: '+ _id);
    res.send('reading cookies')

`````````````````````````````````````````````````````````
userAuth middleware.


const userAuth = async(req, res,next)=>{
  try{  const cookies = req.cookies
    const {token} = cookies;
    if(!token){
        throw new Error('Token is not valid...')
    }
    const decodedObj = await jwt.verify(token,'Pawan@Dev')

    const {_id}=decodedObj
    const user = await User.findById(_id);
    if(!user){
        throw new Error('user not found')
    }
    req.user = user
    next();

}catch(err){
        res.status(400).send('ERROR:'+err.message)
    }
}

module.exports = userAuth