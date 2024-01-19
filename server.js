const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
//creating a server
const app = express();

//connecting to db
mongoose.connect(process.env.MONGODB_URI).then(()=> console.log("Db connected!"))
.catch((err)=>console.log(err))

//health api is created to check whether our server is working or not
app.get("/health" , (req,res)=>{
    //console.log("Hi we are in our health api")
    res.json({
        service : "job listing server",
        status : "Active",
        time : new Date(),
    })
})

//api's that need to be created
//login
//register
//edit
//post
//get details
//home

/*app.post("/post",(req,res)=>{
    res.json({
        service : "job listing server",
        status : "Active",
        time : new Date(),
    })
})*/

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})