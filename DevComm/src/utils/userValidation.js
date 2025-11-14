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