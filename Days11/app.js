const express = require('express');
const app = express()

const connectDb = require('./src/config/database');

connectDb().then(()=>{
    console.log('Database connection established, starting server...');
    app.listen(3000, ()=>{
    console.log('Server is running at port 3000');
    
})}).catch((err)=>{
    console.log(err);

})
