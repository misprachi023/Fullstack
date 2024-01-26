const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const BlacklistTokenModel = require('../models/blacklistToken')
dotenv.config()
const auth=async(req,res,next)=>{
    const token=req.cookies.token
    const refreshToken=req.cookies.refreshToken
    console.log(`the token and refresh token from client side are ${token} and ${refreshToken}`)
    const user=await BlacklistTokenModel.findOne({token:token,refreshToken:refreshToken})
    if(user){
        res.send("Please Login Again")
    }
    else{
        try {
            if(token){   
                const decoded=jwt.verify(token,process.env.secret_key)
                if(decoded){
                req.payload=decoded
                next()
                console.log('you are authenticated')
                }
                else if(refreshToken){
                    const decoded=jwt.verify(refreshToken,process.env.secret_key)
                    if(decoded){
                    req.payload=decoded
                    next()
                    const token=jwt.sign(decoded,process.env.secret_key)
                    res.cookie("token",token)
                    console.log('you are authenticated')
                    }
                    else{
                        res.send("Please Login Again")
                        console.log('you are not authenticated')
                    }
                    
                }
                else{
                    res.send("Please Login Again")
                    console.log('you are not authenticated')
                } 
            }
            
            else{
                res.send("Please Login Again")
                console.log('you are not authenticated')
            }
            
        } catch (error) {
            res.send("Please Login Again")
        }
    }
}

module.exports=auth