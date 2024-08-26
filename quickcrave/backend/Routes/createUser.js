const express=require("express");
const router=express.Router();
const User = require("../models/User.js");
const {body,validationResult}= require("express-validator");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const secrettoken="qwertyuiopqwertyuiopqwertyuiop@#";


router.post('/createuser',
body('email',"Should be in valid email format").isEmail(),
body('password',"Password is too small").isLength({min:6}),
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const salt=await bcrypt.genSalt(10);
    const secPassword=await bcrypt.hash(req.body.password,salt);

    try {
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location,
        })
        res.json({success:true});
    } catch (error){
        console.log(error);
        res.json({success:false});
    }
});

router.post("/loginuser",
body('email','Invalid Email id').isEmail(),
body('password','Wrong password! Try again').isLength({min:5})
,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let email=req.body.email;
    try {
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:"Try logging with correct credentials"})
        }

        const pwdcompare=await bcrypt.compare(req.body.password,userData.password);

        if(!pwdcompare){
            return res.status(400).json({errors:"Try logging with correct credentials"})
        }

        // token
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,secrettoken);

        return res.json({success:true,authToken:authToken});
    } catch (error) {
        console.log("Error:",error);
        res.json({success:false});
    }

})

module.exports=router;