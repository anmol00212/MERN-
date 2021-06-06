const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require('../model/userSchema');


router.get('/', (req, res) => {
    res.send(`HEllO home page router.js`); 
});

//REGISTRATION ROUTE

//Promise Method

/*
router.post('/register', (req, res) => {
    
    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "please fill the field properly"});
    }

    User.findOne({email:email})
    .then((userExist) => {
        if (userExist) {
            return res.status(422).json({error: "Email already Exists !!!"});
        }

        const user = new User({name, email, phone, work, password, cpassword});

        user.save().then(() => {
            res.status(201).json({ message:"User is registered succesfully"}); 
        }).catch((err) => res.status(500).json ({ error: " Failed to register"}));

    }).catch(err => { console.log(err);});

});

*/

// ASYNC-AWAIT Method


router.post('/register', async (req, res) => {
    
    const { name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "please fill the field properly"});
    }
    try {

        const userExist = await User.findOne({email:email})
        
        if (userExist) {
                return res.status(422).json({error: "Email already Exists !!!"});
            }

        const user = new User({name, email, phone, work, password, cpassword});
        
        
        
        // here hashing PRE occurs
        
        
        const userRegister = await user.save();

        if(userRegister) {
            res.status(201).json({ message:"User is registered succesfully"}); 

        }

     

    } catch (err) {
        console.log(err);
    } 

});

//LOGIN ROUTE

router.post('/signin', async (req, res) => {
   // console.log(req.body);
    //res.json({message:'SIGNIN'});
    try{
        const { email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"please fill the credentials"});
        }

        const userLogin = await User.findOne({email:email});

        if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password);

        const token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 25892000000),
            httpOnly: true
        })

        if(!isMatch){
        res.status(400).json({message:"Invalid Credientials"});
        }else{
        res.json({message:"User signed in successfully"});
        }
    }else {
        res.status(400).json({message:"Invalid Credientials"});
    }



    } catch (err) {
        console.log(err);
    }
})




module.exports = router; 