const jwt =require('jsonwebtoken')
const dotenv =require('dotenv').config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    console.log("middleware")
   try {
       jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
           if(err) {
               res.send({msg:"plz login in first"})
           }else{  
             req.payload=decoded
               next()
           }
       })
   } catch (error) {
       res.send({err:error,message:"error while verifying the token"})
   }
    
}
module.exports={
   auth
}