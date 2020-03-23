const express=require("express")

const joi=require("@hapi/joi");

const db=require("../db/connection.js");

const bcrypt=require("bcryptjs");

const router=express.Router()

const users = db.get('users')

users.createIndex("username",{ unique:true });

const schema=joi.object().keys({
   username:joi.string().alphanum().min(2).max(30).required(),
   password:joi.string().required() 
})

//any route in here is pre-pended with /auth
router.get('/',(req,res)=>{
   console.log(req.body);
   res.json({
      message:'Bismillah...'
   })
});

//POST on /auth/signup
router.post("/signup",(req,res,next)=>{
   console.log("printing data::",req.body);  
   const result=schema.validate(req.body);
   if(result.error==null){
      //makesure username is unique..
      users.findOne({
         username:req.body.username
      }).then(user=>{
         //if user is undefine or user is not in db or dublicate user.. 
         if(user){
            //there is already an user with this name...
            const err=new Error("please choose another username..");
            next(err);   
         }else{
              //hash the password and insert into db
              bcrypt.hash(req.body.password,12).then(hashedpassword=>{
                  const newuser={
                     username:req.body.username,
                     password:hashedpassword
                  }
                  users.insert(newuser).then(insertedUser=>{
                     res.json(insertedUser)
                  })
              }); 
         }
      });
   }else{
      next(result.error );
   }
})


module.exports =router