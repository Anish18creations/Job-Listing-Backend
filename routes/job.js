//everthing related to jobs will be done here

const express = require('express');
const router = express.Router();
const Job = require("../models/job");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/authmiddleware");

router.post("/createjob" , jwtverify ,  async(req,res) => {
    try {
        const {companyName , title , description , logoUrl} = req.body;

        if(!companyName || !title || !description || !logoUrl){
            return res.status(400).json({errorMessage : "Bad Request"})
        }

        jobdetails = new Job({
        companyName ,
        title ,
        description , 
        logoUrl ,
        refuserid : req.body.userId,
       });

       await jobdetails.save();

       res.json({ message : "New job added to database"});

    } catch (error) {
        console.log(error);
    }
});

module.exports= router;