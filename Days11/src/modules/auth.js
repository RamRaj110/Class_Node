const adminAuth = (req,res,next)=>{
    console.log("admin auth");
    const token = "123";
    const isAuthorized = token === "123";
    if(!isAuthorized){
        res.status(401).send("not authorized");
    }else{
        next();
    }

}
const userAuth = (req,res,next)=>{
    console.log("user auth");
    const token = "admin123";
    const isAuthorized = token === "admin123";
    if(!isAuthorized){
        res.status(401).send("not authorized");
    }else{
        next();
    }

}

module.exports = {
    adminAuth,
    userAuth
}