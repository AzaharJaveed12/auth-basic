const express=require("express")

const router=express.Router()


//any route in here is pre-pended with /auth 

router.get('/',(req,res)=>{
   console.log(req.body);
   res.json({
      message:'Bismillah...'
   })
});

//POST on /auth/signup
router.post("/signup",(req,res)=>{
   console.log(req.body);  
   res.json({
      message:"💖💖💖"
   })
})


module.exports =router