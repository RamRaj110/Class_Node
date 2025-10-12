const mongoose = require('mongoose');

const connectDb= async ()=>{
    const connect = await mongoose.connect('mongodb://localhost:27017/DevComm');
}
   
module.exports = connectDb;