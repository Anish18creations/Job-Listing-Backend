//authentication for register and login routes will be put here

const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register" , async(req,res) => {
    try{
        const { name , email , mobile , password} = req.body;

        if(!name || !email || !mobile || !password){
            return res.status(400).json({
                errorMessage : "Bad Request",
            });
        }

        const isexistinguser1 = await User.findOne({email:email})
        if(isexistinguser1) {
            return res.status(409).json({
               message : "User already exists with the given email address" 
            })
        }

        const isexistinguser2 = await User.findOne({mobile:mobile})
        if(isexistinguser2) {
            return res.status(409).json({
               message : "User already exists with the given mobile one" 
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        //creating and saving a record in database
        /*await User.create({
            name,
            email,
            mobile,
            password : hashedPassword,
        });*/

        //2nd method to create and save a record in database

        const userData = new User({
            name,
            email,
            mobile,
            password : hashedPassword,
        })

        const userRes = userData.save();

        const token = await jwt.sign({userid : userRes._id} , process.env.JWT_SECRET);

        res.json({message : "User registered successfully" , token : token});
    }
    catch(err)
    {
        console.log(err);
    }
    //valid check
    //error handling
    //check if already user exists
    //write into db
    //create model/schema
});

module.exports = router;