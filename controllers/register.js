const express=require('express');
const bcrypt=require('bcrypt');
const UserModel=require('../models/register');


const RegesterRouter=express.Router();

RegesterRouter.post("/",async(req,res)=>{
    const {name,email,password,gender}=req.body;
	console.log(name,email,password,gender);
    try {
		bcrypt.hash(password, 5, async (err, hash) => {
			console.log("hashing started");
			if (err) {
				res.send("err while hashing the password");
			} else {
				const user=new UserModel({name,email,password:hash,gender});
				console.log(user);
				await user.save();
				res.status(200).send({ msg: "user registered plz login" });
			}
		});
        // const findingUser=await UserModel.findOne({email})
		// if(findingUser){
		// 	return res.status(400).send({msg:"user already exists"})
		// }
		// else{
			
		// }
		// const hashpassword=bcrypt.hash(password,5)
		//     const user= new UserModel({
		// 	name,email,password:hashpassword,gender
		// })
		// await user.save();
	} catch (err) {
		res.status(400).send({ err: err });
	}
})

module.exports=RegesterRouter