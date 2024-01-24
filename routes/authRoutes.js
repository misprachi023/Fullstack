const express = require("express")
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {auth} = require("../middlewares/authMiddleware")
const authRouter= express.Router()
const dotenv= require("dotenv")
dotenv.config()
// const {authMiddleware}=require("./middlewares/authMiddleware") 
authRouter.get("/me", (req, res) => {
       res.send("This is me")
})
// signup 

authRouter.post("/signup",async (req, res) => {
   try {
       const { username, email, password } = req.body
       const userPresent= await UserModel.findOne({email})
     
       if(userPresent){
           res.send("user already present")

       }
       const hashPassword = bcrypt.hashSync(password, 10)

       const newUser = new UserModel({ username, email, password:hashPassword })
       await newUser.save()
       res.send({message:"user created", user: newUser})

   } catch (error) {
       res.send({message:"something went wrong", error})
   }
       
})


// login

authRouter.post("/login",async (req, res) => {
    try {
        const { email, password } = req.body
        const userPresent= await UserModel.findOne({email})
      
        if(!userPresent){
            res.send("user  does not exist, please signup first")
 
        } 
        const isPasswordCorrect = bcrypt.compareSync(password, userPresent.password)
       if(!isPasswordCorrect){
           res.send("invalid credentials")

       } 
       const token = jwt.sign({userId: userPresent._id}, process.env.SECRET_KEY, {expiresIn: "1h"})
        res.cookie("accesstoken", token)
       res.send({message:"login successful", user: userPresent})
    } catch (error) {
        res.send({message:"something went wrong", error})
    }
        
 }) 

 //delete

 authRouter.delete("/delete/:userId", auth,async (req, res) => {
    try {
        const { userId } = req.params
        const id=req.payload.userId
        if(id===userId){
            await UserModel.findByIdAndDelete(userId)
            res.send("user deleted successfully")
        }else{ 
            res.send("not allowed to delete")
        }
    } catch (error) {
        res.send({message:"something wrong ", error})
    }
 })
authRouter.get("/logout",auth, (req, res) => {
    res.send("logout")
})
 //update
 authRouter.patch("/update/:userId",async (req, res) => {
    try {
        const id=req.payload.userId
        const { userId } = req.params
        if(id===userId){
        const userPresent= await UserModel.findByIdAndUpdate(userId, req.body)
        res.send({message:"user updated", user: userPresent})
            
        }else{
            res.send("not allowed to update")
        }
        
    } catch (error) {
        res.send({message:"something wrong", error})
    }
 })
 
 module.exports= authRouter
    
 