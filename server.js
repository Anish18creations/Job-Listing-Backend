const express = require('express');

//creating a server
const app = express();
console.log('Hi')

//health api is created to check whether our server is working or not
app.get("/health" , (req,res)=>{
    //console.log("Hi we are in our health api")
    res.json({
        service : "job listing server",
        status : "Active",
        time : new Date(),
    })
})

/*app.post("/post",(req,res)=>{
    res.json({
        service : "job listing server",
        status : "Active",
        time : new Date(),
    })
})*/

const PORT = 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})